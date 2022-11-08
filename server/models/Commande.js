import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Commande = db.define('commandes', {
    date: DataTypes.DATE,
    prixTotalPaye: DataTypes.DOUBLE,
    prixPoint: DataTypes.INT,
    pointUtulise: DataTypes.INT,
    etat: DataTypes.INT,
},{
    freezeTableName: true
});

export default Commande;

(async()=>{
     await db.sync();
})();