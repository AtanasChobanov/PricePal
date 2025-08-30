import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import PDFParser from "pdf2json";

export default class PdfReaderService {
  // Сваля PDF по URL и го записва локално
  static async downloadPdf(pdfUrl: string, filename: string) {
    const response = await fetch(pdfUrl);
    if (!response.ok)
      throw new Error(`Грешка при сваляне: ${response.statusText}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    const savePath = path.resolve("downloads", filename);

    // Създаваме папка "downloads" ако я няма
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, buffer);

    console.log(`📥 PDF запазен: ${savePath}`);
    return savePath; // връщаме пътя, за да можем да го четем после
  }

  // Чете първите 100 думи от PDF
  static async readFirstWordsFromPdf(filePath: string) {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) =>
      console.error(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      fs.writeFile("./downloads/test.json", JSON.stringify(pdfData), (data) =>
        console.log(data)
      );
    });

    await pdfParser.loadPDF(filePath);
  }
}
