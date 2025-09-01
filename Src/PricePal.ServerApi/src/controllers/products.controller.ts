import type { Request, Response } from "express";
import ScraperService from "../services/scraper/scraper.service.js";

export default class ProductsController {
  static async scrapeProducts(req: Request, res: Response) {
    try {
      const products = await ScraperService.scrapeAllSites();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
