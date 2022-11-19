import express from "express";
import * as cc from "../controllers/PromotionController.js";

const router = express.Router();
router.get("/promotions", cc.getPromotion);
router.get("/promotion/:id", cc.getPromotionById);
router.post("/promotion", cc.createPromotion);
router.patch("/promotion/:id", cc.updatePromotion);
router.delete("/promotion/:id", cc.deletePromotion);

router.post("/menuJour", cc.createMenuJour);
router.patch("/menuJour/:id", cc.updateMenuJour);
router.get("/ligneMenuJour/:id", cc.getLigneByMenu);
router.get("/todayMenuJour", cc.getTodayMenu);
router.delete("/deleteMenu/:id", cc.deleteMenuJour);

export default router;
