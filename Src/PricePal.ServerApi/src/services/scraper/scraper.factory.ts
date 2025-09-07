import type { ScrapedProductFn } from "../../models/scraped-product.model.js";
import KauflandScraperService from "./kaufland-scraper.service.js";

export default class ScraperFactory {
  private static readonly scrapers: Record<string, ScrapedProductFn> = {
    kaufland: KauflandScraperService.scrapeKauflandOffers,
    // lidl, billa, tmarket
  };

  static getScraper(chainName: string): ScrapedProductFn {
    const scraperFn = ScraperFactory.scrapers[chainName.toLowerCase()];
    if (!scraperFn) {
      throw new Error(`❌ No scraper defined for chain: ${chainName}`);
    }
    return scraperFn;
  }
}
