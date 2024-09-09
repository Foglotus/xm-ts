import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../services/user.service.js';
import { md5 } from '../tools/crypt.js';
import { PermitEnum, SECRET } from '../config.js';
import { checkPermit, checkToken } from '../middleware/auth.middleware.js';


export const chooseRouter = express.Router()

// 选课
chooseRouter.post('/select',checkToken, checkPermit(PermitEnum.XK) , async (req, res) => {
    const { id } = req.body;
    // 查找课程
    try {
        
    }catch(e) {
        /** */
    }
})

// 取消选课
chooseRouter.post('/deselect',checkToken, checkPermit(PermitEnum.ADD_COURSE) , async (req, res) => {
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