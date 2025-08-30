import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";

const router = Router();

// GET /products
router.get("/", ProductsController.scrapeProducts);

export default router;
