import express from "express";
import * as cc from "../controllers/ClientController.js";

const router = express.Router();
router.get("/clients", cc.getClient);
router.get("/client/:id", cc.getClientById);
router.post("/client", cc.createClient);
router.patch("/client/:id", cc.updateClient);
router.delete("/client/:id", cc.deleteClient);

export default router;
