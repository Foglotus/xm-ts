// 根据XnModel 生成增删改查

import { XnModel } from "../models/xn.model.js";

interface AddXnParams {
    name: string;
    status: number;
}

/**
 * 学年创建 
 */
async function addXn(params:AddXnParams):Promise<BaseFunRes<XnModel>> {
    try {
       const xn = await XnModel.create(params);
       return [null, xn]
    }catch(e) {
        return ['学年创建失败', null]
    }
}

/**
 * 更新学年
 */
async function updateXn(id:number, params:Partial<XnModel>):Promise<BaseFunRes<XnModel>> {
    try {
        const xn = await XnModel.findByPk(id);
        if (xn) {
            xn.name = params.name as string;
            await xn.save();
            return [null, xn]
        }
        return ['学年不存在', null]
    }catch(e) {
        return ['学年更新失败', null]
    }
}

/**
 * 禁用学年
 */
async function disableXn(id:number):Promise<BaseFunRes<XnModel>> {
    try {
        const xn = await XnModel.findByPk(id);
        if (xn) {
            xn.status = 0;
            await xn.save();
            return [null, xn]
        }
        return ['学年不存在', null]
    }catch(e) {
        return ['学年禁用失败', null]
    }
}

/**
 * 启用学年
 */
async function enableXn(id:number):Promise<BaseFunRes<XnModel>> {
    try {
        const xn = await XnModel.findByPk(id);
        if (xn) {
            xn.status = 1;
            await xn.save();
            return [null, xn]
        }
        return ['学年不存在', null]
    }catch(e) {
        return ['学年启用失败', null]
    }
}

/**
 * 根据id获取学年
 */
async function getXnById(id:number):Promise<BaseFunRes<XnModel>> {
    try {
        const xn = await XnModel.findByPk(id);
        return [null, xn]
    }catch(e) {
        return ['学年获取失败', null]
    }
}

/**
 * 学年列表
 */
async function getXnList(params: {current: number, pageSize: number, name?: string, username?: string}) {
    try {
        const { current, pageSize } = params
        // 根据name和username过滤，有就加入where条件
        const xns = await XnModel.findAll({
            offset: (current - 1) * pageSize,
            limit: pageSize,
        });
        return [null, xns];
    }catch (e: any) {
        console.error("getXnList 查询数据库出错", e)
        return ['查询数据库出错']
    }
}
/**
 * 获取学年总量
 */
async function getXnCount():Promise<BaseFunRes<number>> {
    try {
        const count = await XnModel.count();
        return [null, count]
    }catch(e) {
        return ['学年总量获取失败', null]
    }
}

export {
    addXn,
    updateXn,
    disableXn,
    enableXn,
    getXnList,
    getXnById,
    getXnCount
}