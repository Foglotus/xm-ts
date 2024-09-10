import { Op } from "sequelize";
import { ChooseModel } from "../models/choose.model.js";
import { CourseModel } from "../models/course.model.js";
import { XnModel } from "../models/xn.model.js";
import { UserModel } from "../models/user.model.js";

async function chooseCourse(id: number, useId: string): Promise<BaseFunRes<null>> {
    try {
        // 查看这个人有没有选过该课程
        const rows = await ChooseModel.findAll({
            where: {
                userId: {
                    [Op.eq]: useId
                }
            },
            include: [{
                model: CourseModel,
            }]
        })
        if (!!rows.find(choose => choose.courseId === id)) {
            return ['该课程已选过', null]
        }

        const openTime: string[] = []

        rows.forEach((item:any) => {
            item.openTime?.split(',').forEach((time:string) => {
                openTime.push(time + '--' + item.CourseModel.name)
            })
        })

        console.log("打印openTime", openTime)

        const course = await CourseModel.findByPk(id)
        if (course) {
            // 查询课程开课时间是否冲突
            const c = course.openTime?.split(',')
            for(let i =0;i <c.length;i++) {
                const query = openTime.find(item => item.startsWith(c[i]+'--'))
                if (query) {
                    return [`该课程开课时间冲突: ${query?.split('--')[1]}`, null]
                }
            }
            const [affectedRows] = await CourseModel.increment({
                selected: 1
            }, {
                where: {
                    // 小于opacity
                    selected: {
                        [Op.lt]: course.capacity
                    },
                    id: {
                        [Op.eq]: id
                    }
                }
            })
            if (affectedRows.length > 0) {
                await ChooseModel.create({
                    courseId: id,
                    userId: useId as any,
                    xnId: course.xnId,
                    xq: course.xq,
                    openTime: course.openTime,
                    status: 1,
                })
                return [null, null]
            }

            return ['选课失败，该课程已满', null]
        } else {
            return ['该课程不存在', null]
        }

    } catch (e) {
        /** empty */
        console.error("选课出错", e)
    }
    return ['选课失败', null]
}

// 根据用户id和courseId取消选课
async function cancelCourse(courseId: number, userId: string): Promise<BaseFunRes<null>> {
    try {
        const number = await ChooseModel.destroy({
            where: {
                courseId: courseId,
                userId: userId
            }
        })
        if (number > 0) {
            const course = await CourseModel.findByPk(courseId)
            if (course) {
                await CourseModel.decrement({
                    selected: 1
                }, {
                    where: {
                        // 小于opacity
                        selected: {
                            [Op.gt]: 0
                        },
                        id: {
                            [Op.eq]: courseId
                        }
                    }
                })
                return [null, null]
            } else {
                return ['该课程不存在', null]
            }
        } else {
            return ['取消选课失败', null]
        }
    } catch (e) {
        console.error('选课出错', e)
    }
    return ['取消选课失败', null]
}

// 根据用户id获取已经选的所有课
async function getChoosedCourses(userId: string): Promise<BaseFunRes<ChooseModel[]>> {
    try {
        const rows = await ChooseModel.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: CourseModel,
            }, {
                model: XnModel,
            }, {
                model: UserModel,
            }]
        })
        return [null, rows]
    } catch (e) {
        /** empty */
        console.error("获取选课出错", e)
    }
    return ['获取选课失败', null]
}

export {
    chooseCourse,
    cancelCourse,
    getChoosedCourses
}