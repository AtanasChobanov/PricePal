import { Router } from "express";
import prisma from "../config/prismaClient.js";

const router = Router();

// GET /store-chains
router.get("/", async (req, res) => {
  try {
    const storeChains = await prisma.storeChain.findMany();
    res.json(storeChains);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
