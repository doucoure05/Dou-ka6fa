import express from "express";
import * as cc from "../controllers/Promotion.js";

const router = express.Router();
router.get("/promotion", cc.getPromotion);

export default router;
