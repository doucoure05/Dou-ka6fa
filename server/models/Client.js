import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Client = db.define('clients', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    telephone: DataTypes.STRING,
    adresse: DataTypes.STRING,
    photo: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Client;

(async()=>{
     await db.sync();
})();