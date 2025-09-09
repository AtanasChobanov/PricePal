import type { Page } from "puppeteer";
import type {
  IScrapableProduct,
  IScraper,
} from "../../models/scraper.model.js";
import prisma from "../../config/prisma-client.config.js";
import type { ICategoryLink } from "../../models/category-link.model.js";

export default class LidlScraperService implements IScraper {
  private async extractCategoryLinks(page: Page): Promise<ICategoryLink[]> {
    const availableCategories = (await prisma.category.findMany()).map((cat) =>
      cat.name.toLowerCase()
    );

    const matchedCategoryIndexes = await page.$$eval(
      "nav.n-header__main-navigation-wrapper ol.n-header__main-navigation--sub > li > a",
      (elements, availableCategories) =>
        elements
          .map((el) => {
            const text =
              el
                .querySelector("span.n-header__main-navigation-link-text")
                ?.textContent.trim() ?? "";
            const url = el.href;
            return { text, url };
          })
          .filter(
            (cat) =>
              availableCategories.includes(cat.text.toLowerCase()) &&
              cat.url.includes("/h/")
          ),
      availableCategories
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
      timeout: 10000,
    });

    console.log(
      `➡️ Заредена категория: ${category.text} -> ${categoryPage.url()}`
    );

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
      ".s-page__results .product-grid-box",
      (products, categoryName) => {
        return products.map((el) => {
          const name =
            el
              .querySelector<HTMLDivElement>(".product-grid-box__title")
              ?.textContent.trim() || "";
          const unit =
            el
              .querySelector<HTMLDivElement>(".ods-price__footer:nth-child(2)")
              ?.textContent.trim() || "";
          const prices =
            el.querySelectorAll<HTMLDivElement>(".ods-price__value");
          const priceBgn = prices[0]?.textContent?.trim() || "";
          const priceEur = prices[1]?.textContent?.trim() || "";
          const oldPrices =
            el
              .querySelector<HTMLDivElement>(".ods-price__stroke-price s")
              ?.textContent.trim() || "";

          let oldPriceBgn = "";
          let oldPriceEur = "";
          const match = oldPrices.match(
            /([\d.,]+)\s*ЛВ\.\s*\(([\d.,]+)\s*€\)/i
          );
          if (match) {
            oldPriceBgn = match[1] || "";
            oldPriceEur = match[2] || "";
          }
          const availability =
            el
              .querySelector<HTMLSpanElement>(
                ".product-grid-box__availabilities .ods-badge__label"
              )
              ?.textContent.trim() || "";

          let validFrom = "";
          let validTo = "";

          if (availability != "") {
            const match = availability.match(
              /от\s+(\d{2}\.\d{2}\.)\s*-\s*(\d{2}\.\d{2}\.)/
            );
            if (match && match[1] && match[2]) {
              const currentYear = new Date().getFullYear();
              const from = match[1];
              const to = match[2];

              const [fromDay, fromMonth] = from.split(".");
              const [toDay, toMonth] = to.split(".");

              validFrom = new Date(
                currentYear,
                Number(fromMonth) - 1,
                Number(fromDay) + 1
              ).toISOString();

              validTo = new Date(
                currentYear,
                Number(toMonth) - 1,
                Number(toDay) + 1
              ).toISOString();
            }
          }

          const discount =
            el
              .querySelector<HTMLDivElement>(".ods-price__box-content-text-el")
              ?.textContent.trim() || "";
          const imageUrl =
            el.querySelector<HTMLImageElement>(".odsc-image-gallery__image")
              ?.src || "";

          return {
            category: categoryName,
            name,
            unit,
            priceBgn,
            priceEur,
            oldPriceBgn,
            oldPriceEur,
            validFrom,
            validTo,
            discount,
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
