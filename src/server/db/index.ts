import { DB_PATH, RoleEnum } from "../config.js";
import { Sequelize } from 'sequelize';

// 方法 1: 传递一个连接 URI
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_PATH
});