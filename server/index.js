import express from "express";
import mysql from "mysql";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ClientRoute from "./routes/ClientRoute.js";
import ArticleRoute from "./routes/ArticleRoute.js";
import CategorieRoute from "./routes/CategorieRoute.js";
import SeuilRoute from "./routes/SeuilRoute.js";
import CommandeRoute from "./routes/CommandeRoute.js";
import LignePromotionRoute from "./routes/LignePromotionRoute.js";
import PromotionRoute from "./routes/PromotionRoute.js";
import DashRoute from "./routes/DashRoute.js";

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(UserRoute);
app.use(ClientRoute);
app.use(CategorieRoute);
app.use(SeuilRoute);
app.use(ArticleRoute);
app.use(PromotionRoute);
app.use(CommandeRoute);
app.use(LignePromotionRoute);
app.use(DashRoute);

app.listen(5000, () => console.log("Server up and running!!!"));
