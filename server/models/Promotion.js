import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Promotion = db.define(
  "promotions",
  {
    prixPromotion: DataTypes.INTEGER,
    datePromotion: DataTypes.DATE,
  },
  {
    freezeTableName: true,
  }
);

export default Promotion;

(async () => {
  await db.sync();
})();
