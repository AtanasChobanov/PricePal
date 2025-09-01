import puppeteer, { Browser } from "puppeteer";

export default class ScraperService {
  private static async scrapeKauflandOffers(browser: Browser) {
    const page = await browser.newPage();
    await page.goto(
      "https://www.kaufland.bg/aktualni-predlozheniya/oferti.html?kloffer-week=current&kloffer-category=0001_TopArticle",
      { waitUntil: "networkidle2" }
    );

    // Взимаме всички категории и продуктите в тях
    const products = await page.evaluate(() => {
      const sections = document.querySelectorAll(".k-product-section");
      const allProducts: any[] = [];

      sections.forEach((section) => {
        const category =
          section
            .querySelector(".k-product-section__headline")
            ?.textContent?.trim() || "Неизвестна категория";

        const items = section.querySelectorAll(".k-product-tile");
        items.forEach((item) => {
          const brand =
            item.querySelector(".k-product-tile__title")?.textContent?.trim() ||
            "";
          const subtitle =
            item
              .querySelector(".k-product-tile__subtitle")
              ?.textContent?.trim() || "";
          const unit =
            item
              .querySelector(".k-product-tile__unit-price")
              ?.textContent?.trim() || "";
          const price =
            item.querySelector(".k-price-tag__price")?.textContent?.trim() ||
            "";
          const oldPrice =
            item
              .querySelector(".k-price-tag__old-price")
              ?.textContent?.trim() || "";
          const discount =
            item.querySelector(".k-price-tag__discount")?.textContent?.trim() ||
            "";
          const image =
            (
              item.querySelector(
                ".k-product-tile__main-image"
              ) as HTMLImageElement
            )?.src || "";

          allProducts.push({
            category,
            brand,
            subtitle,
            unit,
            price,
            oldPrice,
            discount,
            image,
          });
        });
      });

      return allProducts;
    });

    await page.close();
    return products;
  }

  static async scrapeAllSites() {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const products = await ScraperService.scrapeKauflandOffers(browser);
      return { products };
    } finally {
      await browser.close();
    }
  }
}
