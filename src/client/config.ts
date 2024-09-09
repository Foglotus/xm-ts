export enum RoleEnum {
    // 超级管理员，管理员，学生
    SUPER = "super",
    ADMIN = "admin",
    STUDENT = "student"
  }

  export const RoleOptions = [
    {
      label: "超级管理员",
      value: RoleEnum.SUPER
    },
    {
      label: "管理员",
      value: RoleEnum.ADMIN
    },
    {
      label: "学生",
      value: RoleEnum.STUDENT
    }
  ]
  
  export enum PermitEnum {
    XK = 'xk', // 可以选课
    ADD_COURSE = "add_course", // 添加课程
    EDIT_COURSE =  "edit_course", // 编辑课程
    DEL_COURSE = "删除课程",
    // 添加用户，编辑用户，删除用户
    ADD_USER = "add_user",
    EDIT_USER = "edit_user",
    DEL_USER = "del_user",
  }

  export const PermitOptions = [
    {
        label: "选课",
        value: PermitEnum.XK
      },
      {
        label: "添加课程",
        value: PermitEnum.ADD_COURSE
      },
      {
        label: "编辑课程",
        value: PermitEnum.EDIT_COURSE
      },
      {
        label: "删除课程",
        value: PermitEnum.DEL_COURSE
      },
      {
        label: "添加用户",
        value: PermitEnum.ADD_USER
      },
      {
        label: "编辑用户",
        value: PermitEnum.EDIT_USER
      },
      {
        label: "删除用户",
        value: PermitEnum.DEL_USER
      }
  ]
  
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
  
  export const OpenTimeOptions = [
    {
      label: "星期一第一节课",
      value: KcEnum.MONDAY_FIRST
    },
    {
      label: "星期一第二节课",
      value: KcEnum.MONDAY_SECOND
    },
    {
      label: "星期一第三节课",
      value: KcEnum.MONDAY_THIRD
    },
    {
      label: "星期一第四节课",
      value: KcEnum.MONDAY_FOURTH
    },
    {
      label: "星期一第五节课",
      value: KcEnum.MONDAY_FIFTH
    },
    {
      label: "星期一第六节课",
      value: KcEnum.MONDAY_SIXTH
    },
    {
      label: "星期一第七节课",
      value: KcEnum.MONDAY_SEVENTH
    },
    {
      label: "星期一第八节课",
      value: KcEnum.MONDAY_EIGHTH
    },
    {
      label: "星期二第一节课",
      value: KcEnum.TUESDAY_FIRST
    },
    {
      label: "星期二第二节课",
      value: KcEnum.TUESDAY_SECOND
    },
    {
      label: "星期二第三节课",
      value: KcEnum.TUESDAY_THIRD
    },
    {
      label: "星期二第四节课",
      value: KcEnum.TUESDAY_FOURTH
    },
    {
      label: "星期二第五节课",
      value: KcEnum.TUESDAY_FIFTH
    },
    {
      label: "星期二第六节课",
      value: KcEnum.TUESDAY_SIXTH
    },
    {
      label: "星期二第七节课",
      value: KcEnum.TUESDAY_SEVENTH
    },
    {
      label: "星期二第八节课",
      value: KcEnum.TUESDAY_EIGHTH
    },
    {
      label: "星期三第一节课",
      value: KcEnum.WEDNESDAY_FIRST
    },
    {
      label: "星期三第二节课",
      value: KcEnum.WEDNESDAY_SECOND
    },
    {
      label: "星期三第三节课",
      value: KcEnum.WEDNESDAY_THIRD
    },
    {
      label: "星期三第四节课",
      value: KcEnum.WEDNESDAY_FOURTH
    },
    {
      label: "星期三第五节课",
      value: KcEnum.WEDNESDAY_FIFTH
    },
    {
      label: "星期三第六节课",
      value: KcEnum.WEDNESDAY_SIXTH
    },
    {
      label: "星期三第七节课",
      value: KcEnum.WEDNESDAY_SEVENTH
    },
    {
      label: "星期三第八节课",
      value: KcEnum.WEDNESDAY_EIGHTH
    },
    {
      label: "星期四第一节课",
      value: KcEnum.THURSDAY_FIRST
    },
    {
      label: "星期四第二节课",
      value: KcEnum.THURSDAY_SECOND
    },
    {
      label: "星期四第三节课",
      value: KcEnum.THURSDAY_THIRD
    },
    {
      label: "星期四第四节课",
      value: KcEnum.THURSDAY_FOURTH
    },
    {
      label: "星期四第五节课",
      value: KcEnum.THURSDAY_FIFTH
    },
    {
      label: "星期四第六节课",
      value: KcEnum.THURSDAY_SIXTH
    },
    {
      label: "星期四第七节课",
      value: KcEnum.THURSDAY_SEVENTH
    },
    {
      label: "星期四第八节课",
      value: KcEnum.THURSDAY_EIGHTH
    },
    {
      label: "星期五第一节课",
      value: KcEnum.FRIDAY_FIRST
    },
    {
      label: "星期五第二节课",
      value: KcEnum.FRIDAY_SECOND
    },
    {
      label: "星期五第三节课",
      value: KcEnum.FRIDAY_THIRD
    },
    {
      label: "星期五第四节课",
      value: KcEnum.FRIDAY_FOURTH
    },
    {
      label: "星期五第五节课",
      value: KcEnum.FRIDAY_FIFTH
    },
    {
      label: "星期五第六节课",
      value: KcEnum.FRIDAY_SIXTH
    },
    {
      label: "星期五第七节课",
      value: KcEnum.FRIDAY_SEVENTH
    },
    {
      label: "星期五第八节课",
      value: KcEnum.FRIDAY_EIGHTH
    }
  ]