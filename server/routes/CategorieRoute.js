import express from "express";
import * as cc from "../controllers/CategorieController.js";

const router = express.Router();
router.get("/categories", cc.getCategorie);
router.get("/categorie/:id", cc.getCategorieById);
router.post("/categorie", cc.createCategorie);
router.patch("/categorie/:id", cc.updateCategorie);
router.delete("/categorie/:id", cc.deleteCategorie);

export default router;
