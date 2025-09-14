import type { Page } from "puppeteer";
import type {
  IScrapableProduct,
  IScraper,
} from "../../models/scraper.model.js";

export default class BillaScraperService implements IScraper {
  async scrapeOffers(page: Page): Promise<IScrapableProduct[]> {
    const validity = await page.$$eval(".product .actualProduct", (nodes) => {
      const validityNode = nodes.find((n) =>
        n.textContent?.includes("Валидност")
      );
      if (!validityNode) return { validFrom: "", validTo: "" };

      const text = validityNode.textContent || "";

      const match = text.match(
        /(\d{2})\.(\d{2})\.(\d{4})?.*\s+(\d{2})\.(\d{2})\.(\d{4})/
      );

      if (!match) return { validFrom: "", validTo: "" };

      const [, d1, m1, y1, d2, m2, y2] = match;

      if (!d1 || !m1 || !d2 || !m2) {
        return { validFrom: "", validTo: "" };
      }

      const fromYear = y1 || new Date().getFullYear().toString();
      const toYear = y2 || fromYear;

      return {
        validFrom: new Date(+fromYear, +m1 - 1, +d1 + 1).toISOString(),
        validTo: new Date(+toYear, +m2 - 1, +d2 + 1).toISOString(),
      };
    });

    const products = await page.$$eval(
      ".product",
      (nodes, validity) =>
        nodes
          .map((el) => {
            const name =
              el.querySelector(".actualProduct")?.textContent?.trim() || "";

            const priceElements = Array.from(
              el.querySelectorAll<HTMLSpanElement>(".price")
            ).map((span) => span.textContent?.trim() || "");

            if (priceElements.length === 0) {
              return null;
            }

            const [oldPriceBgn, oldPriceEur, priceBgn, priceEur] = [
              priceElements[0] || "",
              priceElements[1] || "",
              priceElements[2] || "",
              priceElements[3] || "",
            ];

            const discount =
              el.querySelector(".discount")?.textContent?.trim() || "";

            return {
              category: "Друго",
              name,
              unit: "",
              priceBgn,
              priceEur,
              oldPriceBgn,
              oldPriceEur,
              validFrom: validity.validFrom,
              validTo: validity.validTo,
              discount,
              imageUrl: "",
            } as IScrapableProduct;
          })
          .filter((p) => p !== null),
      validity
    );

    return products;
  }
}
