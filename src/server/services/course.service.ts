import { Op } from "sequelize";
import { KcEnum, PermitEnum, RoleEnum, XQEnum } from "../config.js";
import { md5 } from "../tools/crypt.js";
import { CourseModel } from "../models/course.model.js";

async function getCourseById(id: number) {
  // TODO: implement
  try {
    const course = await CourseModel.findOne({ where: { id } });
    if (course) {
      return [null, course];
    }
    return ['课程不存在']
  } catch (e: any) {
    console.error("getCourseById 查询数据库出错", e)
      return ['查询数据库出错']
  }
}

async function getCourseList(params: {current: number, pageSize: number, name?: string, code?:string, xnId?: number, xq: XQEnum}) {
    try {
        const { current, pageSize } = params
        // 根据name和coursename过滤，有就加入where条件
        const where: any = {}
        if (params.name) {
            where['name'] = {
                [Op.like]: `%${params.name}%`
            }
        }
        if (params.xnId) {
            where['xnId'] = {
                [Op.eq]: params.xnId
            }
        }
        if (params.xq) {
            where['xq'] = {
                [Op.eq]: params.xq
            }
        }
        if (params.code) {
            where['code'] = {
                [Op.like]: `%${params.code}%`
            }
        }

        const courseList = await CourseModel.findAll({
            offset: (current - 1) * pageSize,
            limit: pageSize,
            where: where
        });
        return [null, courseList];
    }catch (e: any) {
        console.error("getCourseList 查询数据库出错", e)
        return ['查询数据库出错']
    }
}

async function getCourseSum() {
    try {
        const sum = await CourseModel.count();
        return [null, sum];
    }catch (e: any) {
        console.error("getCourseSum 查询数据库出错", e)
        return ['查询数据库出错']
    }
}

interface AddCourse{
    name: string;
    code: string; // 课程代码
    description?: string; // 课程描述
    capacity: number; // 课程容量
    xnId: number; // 学年id
    xq: XQEnum; // 学期
    openTime: KcEnum[]; // 开课时间
    status?: number
}

/**
 * 
 * @param params 
 * @returns 
 */
async function addCourse(params: AddCourse) {
    try {
        // md5Password
        const course = await CourseModel.create({
            ...params,
            selected: 0, // 已选人数
            status: 1, // 状态
            openTime: params.openTime?.join(',')
        })
        return [null, course]
    }catch(e) {
        console.error("createCourse 创建课程出错", e)
        return ['创建课程出错']
    }
}

// 更新课程
async function updateCourse(id: number, params: AddCourse): Promise<BaseFunRes>{
    try {
        const course = await CourseModel.findOne({
            where: {
                id
            }
        })
        if (!course) {
            return ['记录不存在', null]
        }

        if (Reflect.has(params, 'status')) {
            course.status = params.status ?? 0
        }
        if (Reflect.has(params, 'capacity')) {
            course.capacity = params.capacity ?? 0
        }
        if (Reflect.has(params, 'name')) {
            course.name = params.name ?? ''
        }
        if (Reflect.has(params, 'code')) {
            course.code = params.code
        }
        if (Reflect.has(params, 'description')) {
            course.description = params.description ?? ''
        }
        if (Reflect.has(params, 'xnId')) {
            course.xnId = params.xnId ?? 0
        }
        if (Reflect.has(params, 'xq')) {
            course.xq = params.xq ?? 0
        }
        if (Reflect.has(params, 'openTime')) {
            course.openTime = params.openTime?.join(',')
        }
        await course.save()
        return [null, null]
    }catch(e) {
        console.error("updateCourse 更新课程出错", e)
        return ['更新课程出错', null]
    }
}

// 根据id删除课程
async function deleteCourse(id: number) {
    try {
        const course = await CourseModel.destroy({
            where: {
                id
            }
        })
        return [null, course]
    }catch(e) {
        console.error("deleteCourse 删除课程出错", e)
        return ['删除课程出错']
    }
}

// 根据课程id查询课程
async function getCourseByCourseId(id: number):Promise<BaseFunRes<CourseModel>> {
    try {
        const course = await CourseModel.findOne({
            where: {
                id,
            }
        })
        if (course) {
            return [null, course]
        }
        return ['课程不存在', null]
    }catch(e) {
        console.error("courseLogin 查询数据库出错", e)
        return ['查询数据库出错', null]
    }
}

export { getCourseList, getCourseById, getCourseSum, addCourse, updateCourse, deleteCourse, getCourseByCourseId};