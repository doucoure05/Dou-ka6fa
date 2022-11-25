import express from "express";
import * as cc from "../controllers/LignePromotion.js";

const router = express.Router();
router.get("/LignePromotions", cc.getLignePromotion);
router.get("/LignePromotionByPromotion/:id", cc.getLigneByPromotion);
router.get("/LignePromotion/:id", cc.getLignePromotionById);
router.post("/LignePromotion", cc.createLignePromotion);
router.patch("/LignePromotion/:id", cc.updateLignePromotion);
router.delete("/LignePromotion/:id", cc.deleteLignePromotion);
router.delete("/deleteLignePromotionAttachToPromo/:promotionId", cc.deleteLignePromotionAttachToPromo);

export default router;
