import puppeteer, { Browser } from "puppeteer";
import PdfReaderService from "./pdf-reader.service.js";

export default class ScraperService {
  private static async scrapeKauflandFlyer(browser: Browser) {
    const page = await browser.newPage();
    await page.goto("https://www.kaufland.bg/broshuri.html", {
      waitUntil: "domcontentloaded",
    });

    // Извличаме линка към най-новата брошура (първия div)
    const pdfUrl = await page.evaluate(() => {
      const flyer = document.querySelector("div.m-flyer-tile");
      return flyer?.getAttribute("data-download-url") || null;
    });

    await page.close();

    if (!pdfUrl) throw new Error("Could not find Kaufland flyer PDF URL");

    const fileName = `kaufland-flyer-${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    const filePath = await PdfReaderService.downloadPdf(pdfUrl, fileName);

    // Разчитаме първите 100 думи
    const previewText = await PdfReaderService.readFirstWordsFromPdf(filePath);

    return { pdfUrl, previewText };
  }

  static async scrapeAllSites() {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const { pdfUrl } = await ScraperService.scrapeKauflandFlyer(browser);
      return { kauflandPdf: pdfUrl };
    } finally {
      await browser.close();
    }
  }
}
