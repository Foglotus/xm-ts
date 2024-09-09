import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../db/index.js";
import { KcEnum, XQEnum } from "../config.js";
import { XnModel } from "./xn.model.js";

export class CourseModel extends Model<
  InferAttributes<CourseModel>,
  InferCreationAttributes<CourseModel>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare code: string;
  declare name: string;
  declare description?: string;
  declare capacity: number;
  declare selected: number;
  declare xnId: ForeignKey<XnModel['id']>;
  declare xn?: NonAttribute<XnModel>;
  declare xq: XQEnum;
  declare openTime: string;
  declare status:number
}

CourseModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
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
  xnId: {
    type: DataTypes.BIGINT,
  },
  /**
   * 学期
   */
  xq: {
    type: DataTypes.ENUM,
    values: [XQEnum.FIRST, XQEnum.SECOND]
  },
  /**
   * 开课时间，数组格式
   */
  openTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  // 这是其他模型参数
  // 启用时间戳
  timestamps: true,
  sequelize: sequelize,
});

CourseModel.belongsTo(XnModel, {
  foreignKey: 'xnId',
})