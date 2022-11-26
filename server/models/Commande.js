import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Commande = db.define(
  "commandes",
  {
    dateCommande: {
      type: DataTypes.DATE,
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
    statut: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      //0: en attente de préparation
      //1: En cous de préparation
      //2: En Attente de livrason
      //3: En cours de livraison
      //4: En Attente de paiement
    },
  },
  {
    freezeTableName: true,
  }
);

export default Commande;

(async () => {
  await db.sync();
})();
