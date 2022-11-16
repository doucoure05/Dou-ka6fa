import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const LignePromotion = db.define('lignePromotions', {
    qte: DataTypes.INTEGER,
    promotionId: {
        type: DataTypes.INTEGER,
        references: { model: "promotions", key: "id" },
    },
    articleId: {
        type: DataTypes.INTEGER,
        references: { model: "articles", key: "id" },
    },

},{
    freezeTableName: true
});

export default LignePromotion;

(async()=>{
     await db.sync();
})();