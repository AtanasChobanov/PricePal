import type { IScraper } from "../../models/scraper.model.js";
import BillaScraperService from "./billa-scraper.service.js";
import KauflandScraperService from "./kaufland-scraper.service.js";
import LidlScraperService from "./lidl-scraper.service.js";
import TMarketScraperService from "./tmarket-scraper.service.js";

export default class ScraperFactory {
  private static scrapers: Record<string, IScraper> = {
    kaufland: new KauflandScraperService(),
    lidl: new LidlScraperService(),
    billa: new BillaScraperService(),
    tmarket: new TMarketScraperService(),
  };

  static getScraper(chainName: string): IScraper {
    const scraper = ScraperFactory.scrapers[chainName.toLowerCase()];
    if (!scraper) {
      throw new Error(`❌ No scraper defined for chain: ${chainName}`);
    }
    return scraper;
  }
}
