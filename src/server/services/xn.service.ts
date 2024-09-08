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
 * 学年列表
 */
async function getXnList():Promise<BaseFunRes<XnModel[]>> {
    try {
        const xnList = await XnModel.findAll();
        return [null, xnList]
    }catch(e) {
        return ['学年列表获取失败', null]
    }
}

export {
    addXn,
    updateXn,
    disableXn,
    enableXn,
    getXnList
}