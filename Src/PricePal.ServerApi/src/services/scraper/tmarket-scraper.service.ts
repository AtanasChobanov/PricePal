import type { Page } from "puppeteer";
import type {
  IScrapableProduct,
  IScraper,
} from "../../models/scraper.model.js";
import prisma from "../../config/prisma-client.config.js";
import type { ICategoryLink } from "../../models/category-link.model.js";

export default class TMarketScraperService implements IScraper {
  private async extractCategoryLinks(page: Page): Promise<ICategoryLink[]> {
    const availableCategories = (await prisma.category.findMany()).map((cat) =>
      cat.name.toLowerCase()
    );

    let matchedCategoryIndexes = await page.$$eval(
      "._nav-mobile ._navigation-dropdown-level-1 > ul > li._navigation-dropdown-list-item.item-collapse > a",
      (links) =>
        links.map((link) => ({
          text:
            link
              .querySelector("span._figure-stack-label")
              ?.textContent.trim() || "",
          url: link.href,
        }))
    );
    console.log(matchedCategoryIndexes.length);

    matchedCategoryIndexes = matchedCategoryIndexes.filter((cat) =>
      availableCategories.includes(cat.text.toLowerCase())
    );
    return matchedCategoryIndexes;
  }

  private async scrapeCategoryPage(
    currentPage: Page,
    category: ICategoryLink
  ): Promise<IScrapableProduct[]> {
    const categoryPage = await currentPage.browser().newPage();

    await categoryPage.goto(category.url, {
      waitUntil: "networkidle2",
    });

    const products = await this.scrapeProductsFromCategory(
      categoryPage,
      category
    );
    await categoryPage.close();
    return products;
  }

  private async scrapeProductsFromCategory(
    categoryPage: Page,
    category: ICategoryLink
  ): Promise<IScrapableProduct[]> {
    return categoryPage.$$eval(
      "._products-list ._product",
      (products, categoryName) => {
        return products.map((el) => {
          const name =
            el.querySelector("._product-name-tag a")?.textContent.trim() || "";

          const unit =
            el
              .querySelector("._product-unit-text ._button_unit")
              ?.textContent?.trim() || "";

          // Текущи цени (лв. и €)
          const priceBgn =
            el
              .querySelector("._product-price-inner .bgn2eur-primary-currency")
              ?.textContent?.trim() || "";

          const priceEur =
            el
              .querySelector(
                "._product-price-inner .bgn2eur-secondary-currency"
              )
              ?.textContent?.trim() || "";

          // Стари цени (лв. и €) – взимаме от <del>
          const oldPriceBgn =
            el
              .querySelector("._product-price-old .bgn2eur-primary-currency")
              ?.textContent?.trim() || "";

          const oldPriceEur =
            el
              .querySelector("._product-price-old .bgn2eur-secondary-currency")
              ?.textContent?.trim() || "";

          // Отстъпка
          const discount =
            el
              .querySelector<HTMLSpanElement>("._product-details-discount")
              ?.textContent?.trim() || "";

          // Валидност – от countdown (атрибут data-end-date)
          const countdownEl = el.querySelector<HTMLDivElement>(
            "._countdown.js-countdown"
          );
          let validFrom = "";
          let validTo = "";

          if (countdownEl) {
            const endDate = countdownEl.getAttribute("data-end-date");
            if (endDate) {
              validTo = new Date(endDate).toISOString();
              // validFrom можем да сложим текущата дата, ако няма начална
              validFrom = new Date().toISOString();
            }
          }

          // Снимка
          const imageUrl =
            el.querySelector<HTMLImageElement>("._product-image img")?.src ||
            "";

          return {
            category: categoryName,
            name,
            unit,
            priceBgn,
            priceEur,
            oldPriceBgn,
            oldPriceEur,
            discount,
            validFrom,
            validTo,
            imageUrl,
          };
        });
      },
      category.text
    );
  }

  async scrapeOffers(page: Page): Promise<IScrapableProduct[]> {
    const categories = await this.extractCategoryLinks(page);

    const productsArrays = await Promise.all(
      categories.map(async (cat) => {
        return await this.scrapeCategoryPage(page, cat);
      })
    );

    return productsArrays.flat();
  }
}
