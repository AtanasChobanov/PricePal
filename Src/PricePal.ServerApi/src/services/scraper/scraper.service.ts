import puppeteer from "puppeteer";
import prisma from "../../config/prisma-client.config.js";
import ScraperFactory from "./scraper.factory.js";

export default class ScraperService {
  async scrapeAllSites() {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const storeChains = await prisma.storeChain.findMany();

      const results = await Promise.all(
        storeChains.map(async (chain) => {
          const page = await browser.newPage();
          const url = `${chain.base_url}${chain.products_page}`;

          try {
            await page.goto(url, { waitUntil: "networkidle2" });

            const scraper = ScraperFactory.getScraper(chain.name);
            const products = await scraper.scrapeOffers(page);

            return { chain: chain.name, products };
          } catch (err: any) {
            console.error(
              `⚠️ Error occurred when scraping ${chain.name}:`,
              err
            );
            return { chain: chain.name, products: [], error: err.message };
          } finally {
            await page.close();
          }
        })
      );

      return results;
    } finally {
      await browser.close();
    }
  }
}
