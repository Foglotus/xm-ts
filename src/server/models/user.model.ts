import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import { RoleEnum } from "../config.js";

export const UserModel = sequelize.define('User', {
    // 在这里定义模型属性
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: [RoleEnum.ADMIN, RoleEnum.STUDENT, RoleEnum.SUPER],
        allowNull: false,
    },
    permit: {
      
    },
    token: {
        type: DataTypes.STRING
    },
    /**
     * 状态， 0 禁用，1启用
     */
    status: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
    }
  }, {
    // 这是其他模型参数
     // 启用时间戳
    timestamps: true,
  });