import express from "express";
import cors from "cors";
import productsRouter from "../routes/products.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.json());

// routes
app.use("/products", productsRouter);

export default app;
