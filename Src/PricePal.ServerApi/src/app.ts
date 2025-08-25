import express from "express";
import cors from "cors";
import storeChainsRouter from "./routes/storeChains.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.json());

// routes
app.use("/store-chains", storeChainsRouter);

export default app;
