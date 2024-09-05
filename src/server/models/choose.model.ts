import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import { XQEnum } from "../config.js";

/**
 * 选课表
 */
export const ChooseModel = sequelize.define('Choose', {
    // 在这里定义模型属性，学年id
    xnId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    // 学期
    xq: {
      type: DataTypes.ENUM,
      values: [XQEnum.FIRST, XQEnum.SECOND],
      allowNull: false,
    },
    // 课程id
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    /**
     * 开课时间标识
     */
    openTime: {
      type: DataTypes.ARRAY,
      allowNull: false,
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