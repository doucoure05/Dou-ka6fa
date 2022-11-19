import express from "express";
import * as cc from "../controllers/CommandeController.js";

const router = express.Router();
router.get("/commandes", cc.getCommande);
router.get("/ventes", cc.getVentes);
router.post("/commande", cc.createCommande);
router.post("/ligneCommande", cc.createLigneCommande);
router.get("/ligneCommandeByCommand/:id", cc.getLigneByCommande);
router.delete("/annulerCommande/:id", cc.annulerCommande);
router.patch("/commandeToVente/:id", cc.updateCommandeToVente);
export default router;
