import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Categorie = db.define('categories', {
    nom: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Categorie;

(async()=>{
     await db.sync();
})();