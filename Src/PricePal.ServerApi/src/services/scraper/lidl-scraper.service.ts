import type { Page } from "puppeteer";
import type {
  IScrapableProduct,
  IScraper,
} from "../../models/scraper.model.js";

export default class LidlScraperService implements IScraper {
  scrapeOffers(page: Page): Promise<IScrapableProduct[]> {
    throw new Error("Method not implemented.");
  }
}
