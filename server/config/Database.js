import {Sequelize} from "sequelize";

const db = new Sequelize('doukafa_db', 'root', '',  {
    host: 'localhost',
    dialect: 'mysql',   
});

export default db;
