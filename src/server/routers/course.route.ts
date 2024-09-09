import express from 'express';
import jwt from 'jsonwebtoken';
import { addCourse, getCourseByCourseId, getCourseList, getCourseSum, updateCourse } from '../services/course.service.js';
import { md5 } from '../tools/crypt.js';
import { PermitEnum, SECRET } from '../config.js';
import { checkPermit, checkRole, checkToken } from '../middleware/auth.middleware.js';


export const courseRouter = express.Router()

// 添加用户，name, coursename, password, role,permit 需要管理员权限
courseRouter.post('/add',checkToken, checkPermit(PermitEnum.ADD_COURSE) , async (req, res) => {
    const params = req.body;
    const [_err, result] = await addCourse(params);
    if (result) {
        res.json({ code: 0, message: 'Course added successfully' });
    } else {
        res.json({code: 500, message: 'Failed to add course' });
    }
})

// 更新用户，需要管理员权限
courseRouter.post('/update', checkToken, checkPermit(PermitEnum.EDIT_COURSE), async (req, res) => {
    let { id, name, coursename, password, role, permit } = req.body;
    const [_err] = await updateCourse(id, req.body);
    if (!_err) {
      return  res.json({ code: 0, message: 'Course updated successfully' });
    }
    return res.json({ code: 500, message: _err });
})

// 获取用户列表，分页参数 current和pageSize
courseRouter.get('/list', async (req, res) => {
    const { current, pageSize, name, code, xnId, xq }: any = req.query;
    const [sumE, sum] = await getCourseSum();
    const [err, courseList] = await getCourseList({ current, pageSize, name, code, xnId, xq });

    if (sumE || err) {
        return res.json({
            code: 500,
            message: 'Failed to get course list'
        })
    }

    return res.json({
        data: courseList,
        total: sum,
        success: true,
        current: Number(current),
        pageSize: Number(pageSize),
    })
})