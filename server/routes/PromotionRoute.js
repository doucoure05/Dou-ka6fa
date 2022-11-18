import express from "express";
import * as cc from "../controllers/Promotion.js";

const router = express.Router();
router.get("/promotions", cc.getPromotion);
router.get("/promotion/:id", cc.getPromotionById);
router.post("/promotion", cc.createPromotion);
router.patch("/promotion/:id", cc.updatePromotion);
router.delete("/promotion/:id", cc.deletePromotion);

export default router;
