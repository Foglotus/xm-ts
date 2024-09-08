import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../db/index.js";
import { XQEnum } from "../config.js";
import { XnModel } from "./xn.model.js";
import { UserModel } from "./user.model.js";


export class ChooseModel extends Model<
  InferAttributes<ChooseModel>,
  InferCreationAttributes<ChooseModel>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare xnId: ForeignKey<XnModel['id']>;
  declare userId: ForeignKey<UserModel['id']>;
  declare xq: XQEnum;
  declare courseId: number;
  declare openTime: number[];
  declare status: number;
}

/**
 * 选课表
 */
ChooseModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
    // 在这里定义模型属性，学年id
    xnId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    // 课程id
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    // 用户id
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    // 学期
    xq: {
      type: DataTypes.ENUM,
      values: [XQEnum.FIRST, XQEnum.SECOND],
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
    sequelize: sequelize,
  });

  ChooseModel.belongsTo(XnModel, {
    foreignKey: 'xnId',
    targetKey: 'id',
  })

  ChooseModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    targetKey: 'id',
  })