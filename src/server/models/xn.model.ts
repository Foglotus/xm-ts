import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

/**
 * 学年表
 */
export const XnModel = sequelize.define('Xn', {
    // 在这里定义模型属性
    name: {
      type: DataTypes.STRING,
      allowNull: false
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