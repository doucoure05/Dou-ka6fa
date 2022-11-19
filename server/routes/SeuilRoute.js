import express from "express";
import * as cc from "../controllers/SeuilController.js";

const router = express.Router();
router.get("/seuils", cc.getSeuil);
router.post("/seuil", cc.createSeuil);
router.patch("/seuil/:id", cc.updateSeuil);
router.delete("/seuil/:id", cc.deleteSeuil);

export default router;
