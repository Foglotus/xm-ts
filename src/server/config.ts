import 'dotenv/config'
import path from 'path'

export const SECRET: string = process.env.SECRET as string

export const DB_PATH = path.resolve('db.sqlite')


export enum RoleEnum {
  // 超级管理员，管理员，学生
  SUPER = "super",
  ADMIN = "admin",
  STUDENT = "student"
}

export enum PermitEnum {
  XK = 'xk', // 可以选课
  ADD_COURSE = "add_course", // 添加课程
  EDIT_COURSE =  "edit_course", // 编辑课程
  DEL_COURSE = "del_course",
  // 添加用户，编辑用户，删除用户
  ADD_USER = "add_user",
  EDIT_USER = "edit_user",
  DEL_USER = "del_user",
  // 学年
  ADD_XN = "add_xn",
  EDIT_XN = "edit_xn",
  DEL_XN = "del_xn",
}

export enum XQEnum {
  FIRST = "1",
  SECOND = "2"
}

/**
 * 课程时间安排，星期一到星期五第一节到第八节课，采用唯一表示
 */
export enum KcEnum {
  // 星期一第一节课
  MONDAY_FIRST = "11",
  // 星期一第二节课
  MONDAY_SECOND = "12",
  // 星期一第三节课
  MONDAY_THIRD = "13",
  // 星期一第四节课
  MONDAY_FOURTH = "14",
  // 星期一第五节课
  MONDAY_FIFTH = "15",
  // 星期一第六节课
  MONDAY_SIXTH = "16",
  // 星期一第七节课
  MONDAY_SEVENTH = "17",
  // 星期一第八节课
  MONDAY_EIGHTH = "18",
  // 星期二第一节课
  TUESDAY_FIRST = "21",
  // 星期二第二节课
  TUESDAY_SECOND = "22",
  // 星期二第三节课
  TUESDAY_THIRD = "23",
  // 星期二第四节课
  TUESDAY_FOURTH = "24",
  // 星期二第五节课
  TUESDAY_FIFTH = "25",
  // 星期二第六节课
  TUESDAY_SIXTH = "26",
  // 星期二第七节课
  TUESDAY_SEVENTH = "27",
  // 星期二第八节课
  TUESDAY_EIGHTH = "28",
  // 星期三第一节课
  WEDNESDAY_FIRST = "31",
  // 星期三第二节课
  WEDNESDAY_SECOND = "32",
  // 星期三第三节课
  WEDNESDAY_THIRD = "33",
  // 星期三第四节课
  WEDNESDAY_FOURTH = "34",
  // 星期三第五节课
  WEDNESDAY_FIFTH = "35",
  // 星期三第六节课
  WEDNESDAY_SIXTH = "36",
  // 星期三第七节课
  WEDNESDAY_SEVENTH = "37",
  // 星期三第八节课
  WEDNESDAY_EIGHTH = "38",
  // 星期四第一节课
  THURSDAY_FIRST = "41",
  // 星期四第二节课
  THURSDAY_SECOND = "42",
  // 星期四第三节课
  THURSDAY_THIRD = "43",
  // 星期四第四节课
  THURSDAY_FOURTH = "44",
  // 星期四第五节课
  THURSDAY_FIFTH = "45",
  // 星期四第六节课
  THURSDAY_SIXTH = "46",
  // 星期四第七节课
  THURSDAY_SEVENTH = "47",
  // 星期四第八节课
  THURSDAY_EIGHTH = "48",
  // 星期五第一节课
  FRIDAY_FIRST = "51",
  // 星期五第二节课
  FRIDAY_SECOND = "52",
  // 星期五第三节课
  FRIDAY_THIRD = "53",
  // 星期五第四节课
  FRIDAY_FOURTH = "54",
  // 星期五第五节课
  FRIDAY_FIFTH = "55",
  // 星期五第六节课
  FRIDAY_SIXTH = "56",
  // 星期五第七节课
  FRIDAY_SEVENTH = "57",
  // 星期五第八节课
  FRIDAY_EIGHTH = "58",
}
