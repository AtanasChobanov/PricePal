import type { Page } from "puppeteer";
import type { ScrapedProduct } from "../../models/scraped-product.model.js";

export default class KauflandScraperService {
  static async scrapeKauflandOffers(page: Page): Promise<ScrapedProduct[]> {
    const products = await page.evaluate(() => {
      const sections = document.querySelectorAll(".k-product-section");
      const allProducts: ScrapedProduct[] = [];

      const { validFrom, validTo } = extractValidityPeriod();
      sections.forEach((section) => {
        const products = extractSectionData(section, validFrom, validTo);
        allProducts.push(...products);
      });

      return allProducts;

      function extractValidityPeriod() {
        const bubbleGroup = document.querySelectorAll(".k-smooth-scroll");
        const bubble = bubbleGroup[2]?.querySelector(
          ".k-bubble-group__list .k-navigation-bubble__label"
        );

        if (!bubble) return { validFrom: "", validTo: "" };

        const text = bubble.textContent?.trim() || "";
        const match = text.match(
          /(\d{2}\.\d{2}\.\d{4}) - (\d{2}\.\d{2}\.\d{4})/
        );

        if (!match) return { validFrom: "", validTo: "" };

        const [_, from, to] = match;
        if (!from || !to) return { validFrom: "", validTo: "" };

        const [d1, m1, y1] = from.split(".");
        const [d2, m2, y2] = to.split(".");

        return {
          validFrom: `${y1}-${m1}-${d1}`,
          validTo: `${y2}-${m2}-${d2}`,
        };
      }

      function extractProductData(
        item: Element,
        category: string,
        validFrom: string,
        validTo: string
      ) {
        const title =
          item.querySelector(".k-product-tile__title")?.textContent?.trim() ??
          "";
        const subtitle =
          item
            .querySelector(".k-product-tile__subtitle")
            ?.textContent?.trim() ?? "";
        const name = `${title} ${subtitle}`.trim();

        const unit =
          item
            .querySelector(".k-product-tile__unit-price")
            ?.textContent?.trim() || "";

        const prices = item.querySelectorAll(".k-price-tag__price");
        const priceBgn = prices[0]?.textContent?.trim() || "";
        const priceEur = prices[1]?.textContent?.trim() || "";

        const oldPrices = item.querySelectorAll(".k-price-tag__old-price");
        const oldPriceBgn = oldPrices[0]?.textContent?.trim() || "";
        const oldPriceEur = oldPrices[1]?.textContent?.trim() || "";

        const discount =
          item.querySelector(".k-price-tag__discount")?.textContent?.trim() ||
          "";

        const image =
          (
            item.querySelector(
              ".k-product-tile__main-image"
            ) as HTMLImageElement
          )?.src || "";

        return {
          category,
          name,
          unit,
          priceBgn,
          priceEur,
          oldPriceBgn,
          oldPriceEur,
          validFrom,
          validTo,
          discount,
          image,
        };
      }

      function extractSectionData(
        section: Element,
        validFrom: string,
        validTo: string
      ) {
        const category =
          section
            .querySelector(".k-product-section__headline")
            ?.textContent?.trim() || "Неизвестна категория";

        const items = section.querySelectorAll(".k-product-tile");
        return Array.from(items).map((item) =>
          extractProductData(item, category, validFrom, validTo)
        );
      }
    });

    return products;
  }
}
