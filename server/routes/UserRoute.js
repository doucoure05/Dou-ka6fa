import express from "express";
import * as cc from "../controllers/UserController.js";

const router = express.Router();
router.get("/users", cc.getUsers);
router.get("/user/:id", cc.getUserById);
router.post("/user", cc.createUser);
router.patch("/user/:id", cc.updateUser);
router.delete("/user/:id", cc.deleteUser);
router.post("/userByLoginAndPass", cc.getUsserByLoginAndPassword);

export default router;
