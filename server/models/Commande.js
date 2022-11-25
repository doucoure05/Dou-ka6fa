import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Commande = db.define(
  "commandes",
  {
    dateCommande: {
      type: DataTypes.DATE,
      // get: function () {
      //   return this.getDataValue("dateCommande").toLocaleString("fr-FR", {
      //     timeZone: "UTC",
      //   });
      // },
    },
    dateVente: DataTypes.DATE,
    total: DataTypes.DOUBLE,
    prixTotalPaye: DataTypes.DOUBLE,
    prixPoint: DataTypes.INTEGER,
    pointUtilise: DataTypes.INTEGER,
    etat: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    qtePromotion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: { model: "clients", key: "id" },
    },
    promotionId: {
      type: DataTypes.INTEGER,
      references: { model: "promotions", key: "id" },
    },
    lieuLivraison: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Commande;

(async () => {
  await db.sync();
})();
