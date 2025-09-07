import puppeteer from "puppeteer";

export interface ScrapedProduct {
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
  image: string;
}

export type ScrapedProductFn = (
  page: puppeteer.Page
) => Promise<ScrapedProduct[]>;
