import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Article = db.define(
  "articles",
  {
    nom: DataTypes.STRING,
    description: DataTypes.STRING,
    qteJour: DataTypes.INTEGER,
    prix: DataTypes.DOUBLE,
    photo: DataTypes.STRING,
    point: DataTypes.INTEGER,
    categorieId: {
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Article;

(async () => {
  await db.sync();
})();
