import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const LignePromotion = db.define('lignePromotions', {
    ligne: DataTypes.STRING,
},{
    freezeTableName: true
});

export default LignePromotion;

(async()=>{
     await db.sync();
})();