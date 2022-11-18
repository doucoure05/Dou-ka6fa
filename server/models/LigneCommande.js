import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const LigneCommande = db.define(
  "ligneCommandes",
  {
    qte: DataTypes.INTEGER,
    articleId: {
      type: DataTypes.INTEGER,
      references: { model: "articles", key: "id" },
    },
    commandeId: {
      type: DataTypes.INTEGER,
      references: { model: "commandes", key: "id" },
    },
  },
  {
    freezeTableName: true,
  }
);

export default LigneCommande;

(async () => {
  await db.sync();
})();
