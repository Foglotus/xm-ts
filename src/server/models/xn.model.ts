import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../db/index.js";

export class XnModel extends Model<
  InferAttributes<XnModel>,
  InferCreationAttributes<XnModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare status: number;
}


/**
 * 学年表
 */
XnModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  /**
   * 状态， 0 禁用，1启用
   */
  status: {
    type: DataTypes.SMALLINT,
    defaultValue: 0,
  },
}, {
  // 这是其他模型参数
  // 启用时间戳
  timestamps: true,
  sequelize,
  tableName: 'xn'
});