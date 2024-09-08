import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from "../db/index.js";
import { PermitEnum, RoleEnum } from "../config.js";


export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare username: string;
  declare name: string;
  declare password: string;
  declare role?: RoleEnum;
  declare permit?: string;
  declare token?: string;
  declare status?: number;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

UserModel.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [[RoleEnum.ADMIN, RoleEnum.STUDENT, RoleEnum.SUPER]],
        }
    },
    permit: {
      type: DataTypes.STRING,
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
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    // 这是其他模型参数
    // 启用时间戳
    timestamps: true,
    sequelize,
  });