import { Op } from "sequelize";
import { PermitEnum, RoleEnum } from "../config.js";
import { UserModel } from "../models/user.model.js";
import { md5 } from "../tools/crypt.js";

async function getUserById(id: number) {
  // TODO: implement
  try {
    const user = await UserModel.findOne({ where: { id } });
    if (user) {
      return [null, user];
    }
    return ['用户不存在']
  } catch (e: any) {
    console.error("getUserById 查询数据库出错", e)
      return ['查询数据库出错']
  }
}

async function getUserList(params: {current: number, pageSize: number, name?: string, username?: string}) {
    try {
        const { current, pageSize } = params
        // 根据name和username过滤，有就加入where条件
        const users = await UserModel.findAll({
            offset: (current - 1) * pageSize,
            limit: pageSize,
            where: {
                name: {
                    [Op.like]: `%${params.name || ''}%`
                },
                username: {
                    [Op.like]: `%${params.username || ''}%`
                },
            }
        });
        return [null, users];
    }catch (e: any) {
        console.error("getUserList 查询数据库出错", e)
        return ['查询数据库出错']
    }
}

async function getUserSum() {
    try {
        const sum = await UserModel.count();
        return [null, sum];
    }catch (e: any) {
        console.error("getUserSum 查询数据库出错", e)
        return ['查询数据库出错']
    }
}

interface AddUser{
    name: string,
    password: string
    username: string
    role: RoleEnum
    permit?: PermitEnum[]
    status?: number
}

/**
 * 
 * @param params 
 * @returns 
 */
async function createUser(params: AddUser) {
    try {
        // md5Password
        const md5Password = md5(params.password)
        params.password = md5Password
        const user = await UserModel.create({
            ...params,
            permit: params.permit ? params.permit.join(',') : undefined,
        })
        return [null, user]
    }catch(e) {
        console.error("createUser 创建用户出错", e)
        return ['创建用户出错']
    }
}

// 更新用户， 根据id更新用户
async function updateUser(id: number, params: AddUser): Promise<BaseFunRes>{
    try {
        const [count] = await UserModel.update({
            ...params,
            permit: params.permit ? params.permit.join(',') : undefined,
        }, {
            where: {
                id
            }
        })
        if (count > 0) {
            return [null, null]
        }
        return ['记录不存在', null]
    }catch(e) {
        console.error("updateUser 更新用户出错", e)
        return ['更新用户出错', null]
    }
}

// 根据自增id删除用户
async function deleteUser(id: number) {
    try {
        const user = await UserModel.destroy({
            where: {
                id
            }
        })
        return [null, user]
    }catch(e) {
        console.error("deleteUser 删除用户出错", e)
        return ['删除用户出错']
    }
}

// 用户登录,根据用户名和密码查询用户
async function getUserByUsername(username: string):Promise<BaseFunRes<UserModel>> {
    try {
        const user = await UserModel.findOne({
            where: {
                username,
            }
        })
        if (user) {
            return [null, user]
        }
        return ['用户不存在', null]
    }catch(e) {
        console.error("userLogin 查询数据库出错", e)
        return ['查询数据库出错', null]
    }
}

// 根据用户id查询用户
async function getUserByUserId(id: number):Promise<BaseFunRes<UserModel>> {
    try {
        const user = await UserModel.findOne({
            where: {
                id,
            }
        })
        if (user) {
            return [null, user]
        }
        return ['用户不存在', null]
    }catch(e) {
        console.error("userLogin 查询数据库出错", e)
        return ['查询数据库出错', null]
    }
}

export { getUserById, getUserList, createUser, deleteUser, getUserByUsername, getUserSum, updateUser, getUserByUserId };