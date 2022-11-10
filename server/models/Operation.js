import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Operation = db.define('operations', {
    libelle: DataTypes.STRING,
    date: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Operation;

(async()=>{
     await db.sync();
})();