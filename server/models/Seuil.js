import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Seuil = db.define(
  "seuil",
  {
    point: DataTypes.INTEGER,
    montant: DataTypes.DOUBLE,
  },
  {
    freezeTableName: true,
  }
);

export default Seuil;

(async () => {
  await db.sync();
})();
