import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../services/user.service.js';
import { md5 } from '../tools/crypt.js';
import { PermitEnum, SECRET } from '../config.js';
import { checkPermit, checkToken } from '../middleware/auth.middleware.js';
import { addXn, getXnById, getXnCount, getXnList } from '../services/xn.service.js';


export const xnRouter = express.Router()

// 学年添加，需要管理员权限
xnRouter.post('/add',checkToken, checkPermit(PermitEnum.ADD_COURSE) , async (req, res) => {
    const { name, username, password, role, permit } = req.body;
    const [_err, user] = await getUserByUsername(username);
    if (user) {
        res.json({ code: 500, message: 'Username already exists' });
    } else {
        const [_err, result] = await addXn({
            name,
            status: 0
        });
        if (result) {
            res.json({ code: 0, message: 'User added successfully' });
        } else {
            res.json({code: 500, message: 'Failed to add user' });
        }
    }
})

// 学年更新
xnRouter.post('/update', checkToken, checkPermit(PermitEnum.EDIT_USER), async (req, res) => {
    let { id, name } = req.body;
    const [_err, xn] = await getXnById(id);
    if (xn) {
        // 比对参数，如果密码发生了改变，那么就需要重新加密
        xn.name = name;
        try {
            await xn.save()
            return res.json({ code: 0, message: 'Xn updated successfully' });
        }catch(e) {
            /** */
            return res.json({ code: 500, message: 'Failed to update xn' });
        }
    }
    return res.json({ code: 500, message: '学年不存在' });
})

// 学年列表
xnRouter.get('/list', async (req, res) => {
    const { current, pageSize }: any = req.query;
    const [sumE, sum] = await getXnCount();
    const [err, xnList] = await getXnList({ current, pageSize})

    if (sumE || err) {
        return res.json({
            code: 500,
            message: 'Failed to get xn list'
        })
    }

    return res.json({
        data: xnList,
        total: sum,
        success: true,
        current: Number(current),
        pageSize: Number(pageSize),
    })
})