import express from "express";
import * as cc from "../controllers/DashController.js";

const router = express.Router();
router.get("/clientFidele", cc.getClientFidele);
router.get("/menuPlusVendu", cc.getMenuPlusVendu);
router.get("/ventePeriod", cc.getVentesPeriod);
router.get("/menuVenduPeriodJ", cc.getMenuPlusVenduPeriodJ);
router.get("/menuVenduPeriodM", cc.getMenuPlusVenduPeriodM);
export default router;
