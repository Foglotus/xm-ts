import express from 'express';
import { PermitEnum } from '../config.js';
import { checkPermit, checkToken } from '../middleware/auth.middleware.js';
import { cancelCourse, chooseCourse, getChoosedCourses } from '../services/choose.service.js';


export const chooseRouter = express.Router()

// 选课
chooseRouter.post('/select',checkToken, checkPermit(PermitEnum.XK) , async (req: any, res) => {
    const { courseId } = req.body;
    // 查找课程
    try {
       const [err, _] = await chooseCourse(courseId, req.user.id);
       if (err) {
           return res.json({ code: 500, message: err});
       } else {
        return res.json({ code: 0, message: '选课成功' });
       }
    }catch(e) {
        /** */
    }
    return res.json({ code: 500, message: '选课失败' });
})

// 取消选课
chooseRouter.post('/deselect',checkToken, checkPermit(PermitEnum.ADD_COURSE) , async (req: any, res) => {
    const { courseId } = req.body;
    // 查找课程
    try {
       const [err, _] = await cancelCourse(courseId, req.user.id);
       if (err) {
           return res.json({ code: 500, message: err});
       } else {
        return res.json({ code: 0, message: '选课成功' });
       }
    }catch(e) {
        /** */
    }
    return res.json({ code: 500, message: '选课失败' });
})

// 获取已经选择的课程
chooseRouter.get('/getSelected',checkToken, async (req: any, res) => {
    // 查找课程
    try {
       const [err, data] = await getChoosedCourses(req.user.id);
       if (err) {
           return res.json({ code: 500, message: err});
       } else {
        return res.json({ code: 0, message: '获取成功', data: data, success: true, total: data?.length });
       }
    }catch(e) {
        /** */
        return res.json({ code: 500, message: '获取失败' });
    }
})