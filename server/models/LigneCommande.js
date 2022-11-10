import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const LigneCommande = db.define('ligneCommandes', {
    qte: DataTypes.INT,
},{
    freezeTableName: true
});

export default LigneCommande;

(async()=>{
     await db.sync();
})();