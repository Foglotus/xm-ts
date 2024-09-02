import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import { XQEnum } from "../config.js";

export const CourseModel = sequelize.define('Course', {
  /**
   * 课程代号，唯一
   */
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // 课程名称
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /**
   * 课程描述
   */
  description: {
    type: DataTypes.STRING,
  },
  /**
   * 课程选课容量
   */
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  selected: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  /**
   * 学年
   */
  xn: {
    type: DataTypes.BIGINT,
  },
  /**
   * 学期
   */
  xq: {
    type: DataTypes.ENUM,
    values: [XQEnum.FIRST, XQEnum.SECOND]
  }
}, {
  // 这是其他模型参数
  // 启用时间戳
  timestamps: true,
});