import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Article = db.define('articles', {
    nom: DataTypes.STRING,
    description: DataTypes.STRING,
    qteJour: DataTypes.INT,
    prix: DataTypes.DOUBLE,
    photo: DataTypes.STRING,
    point: DataTypes.INT,
},{
    freezeTableName: true
});

export default Article;

(async()=>{
     await db.sync();
})();