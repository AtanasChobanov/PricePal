import { Page } from "puppeteer";

export interface IScrapableProduct {
  category: string;
  name: string;
  unit: string;
  priceBgn: string;
  priceEur: string;
  oldPriceBgn: string;
  oldPriceEur: string;
  validFrom: string;
  validTo: string;
  discount: string;
  imageUrl: string;
}

export interface IScraper {
  scrapeOffers(page: Page): Promise<IScrapableProduct[]>;
}
