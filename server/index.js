import express from "express";
import mysql from "mysql";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ClientRoute from "./routes/ClientRoute.js";
import ArticleRoute from "./routes/ArticleRoute.js";
import CategorieRoute from "./routes/CategorieRoute.js";
import PromotionRoute from "./routes/PromotionRoute.js";
import LignePromotionRoute from "./routes/LignePromotionRoute.js";


const app = express();
app.use(cors({}));
app.use(express.json());
app.use(UserRoute);
app.use(ClientRoute);
app.use(CategorieRoute);
app.use(ArticleRoute);
app.use(PromotionRoute);
app.use(LignePromotionRoute);

app.listen(5000, () => console.log("Server up and running!!!"));
