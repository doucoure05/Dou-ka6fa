import express from "express";
import mysql from "mysql";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ClientRoute from "./routes/ClientRoute.js";

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(UserRoute);
app.use(ClientRoute);

app.listen(5000, () => console.log("Server up and running!!!"));
