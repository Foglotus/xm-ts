import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUserId, getUserByUsername, getUserList, getUserSum } from '../services/user.service.js';
import { md5 } from '../tools/crypt.js';
import { PermitEnum, SECRET } from '../config.js';
import { checkPermit, checkRole, checkToken } from '../middleware/auth.middleware.js';


export const userRouter = express.Router()

// 添加用户，name, username, password, role,permit 需要管理员权限
userRouter.post('/add',checkToken, checkPermit(PermitEnum.ADD_USER) , async (req, res) => {
    const { name, username, password, role, permit } = req.body;
    const [_err, user] = await getUserByUsername(username);
    if (user) {
        res.json({ code: 500, message: 'Username already exists' });
    } else {
        const [_err, result] = await createUser({
            name, username, password, role, permit: permit?.join(',')
        });
        if (result) {
            res.json({ code: 0, message: 'User added successfully' });
        } else {
            res.json({code: 500, message: 'Failed to add user' });
        }
    }
})

// 更新用户，需要管理员权限
userRouter.post('/update', checkToken, checkPermit(PermitEnum.EDIT_USER), async (req, res) => {
    let { id, name, username, password, role, permit } = req.body;
    const [_err, user] = await getUserByUserId(id);
    if (user) {
        // 比对参数，如果密码发生了改变，那么就需要重新加密
        if (password !== user.password) {
            user.password = md5(password);
        }
        user.name = name;
        user.username = username;
        user.role = role;
        user.permit = permit?.join(',') ?? undefined;
        try {
            await user.save()
            return res.json({ code: 0, message: 'User updated successfully' });
        }catch(e) {
            /** */
            return res.json({ code: 500, message: 'Failed to update user' });
        }
    }
    return res.json({ code: 500, message: '用户不存在' });
})

// 获取用户列表，分页参数 current和pageSize
userRouter.get('/list', async (req, res) => {
    const { current, pageSize, name, username }: any = req.query;
    const [sumE, sum] = await getUserSum();
    const [err, userList] = await getUserList({ current, pageSize, name, username})

    if (sumE || err) {
        return res.json({
            code: 500,
            message: 'Failed to get user list'
        })
    }

    return res.json({
        data: userList,
        total: sum,
        success: true,
        current: Number(current),
        pageSize: Number(pageSize),
    })
})