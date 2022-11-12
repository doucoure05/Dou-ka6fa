import express from "express";
import * as cc from "../controllers/ArticleController.js";

const router = express.Router();
router.get("/articles", cc.getArticle);
router.get("/article/:id", cc.getArticleById);
router.post("/article", cc.createArticle);
router.patch("/article/:id", cc.updateArticle);
router.delete("/article/:id", cc.deleteArticle);

export default router;
