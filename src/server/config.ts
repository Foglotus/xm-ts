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

export enum XQEnum {
  FIRST = "1",
  SECOND = "2"
}