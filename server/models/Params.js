import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Params = db.define('params', {
    code: DataTypes.STRING,
    libelle: DataTypes.STRING,
    type: DataTypes.STRING,
    valeur: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Params;

(async()=>{
     await db.sync();
})();