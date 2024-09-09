import { Op } from "sequelize";
import { ChooseModel } from "../models/choose.model.js";
import { CourseModel } from "../models/course.model.js";

async function chooseCourse(id: number, useId: string):Promise<BaseFunRes<null>> {
    try {
       // 查看这个人有没有选过该课程
       const {rows, count} = await ChooseModel.findAndCountAll({
        where: {
            courseId: {
                [Op.eq]: id
            },
            userId: {
                [Op.eq]: useId
            }
        }
       })
       if (count > 0) {
        return ['该课程已选过', null]
       }
       const course = await CourseModel.findByPk(id)
       
    }catch(e) {
        /** empty */
    }
}