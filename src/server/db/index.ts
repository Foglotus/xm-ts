import { DB_PATH } from "../config.ts";
import { Sequelize } from 'sequelize';

// 方法 1: 传递一个连接 URI
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_PATH
});

export async function checkDbConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}