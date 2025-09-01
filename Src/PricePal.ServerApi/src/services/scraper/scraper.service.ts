import puppeteer from "puppeteer";
import KauflandScraperService from "./kaufland-scraper.service.js";

export default class ScraperService {
  static async scrapeAllSites() {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.goto(
        "https://www.kaufland.bg/aktualni-predlozheniya/oferti.html?kloffer-week=current&kloffer-category=0001_TopArticle",
        { waitUntil: "networkidle2" }
      );

      const products = await KauflandScraperService.scrapeKauflandOffers(page);

      await page.close();
      return { products };
    } finally {
      await browser.close();
    }
  }
}
