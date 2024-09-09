import bodyParser from "body-parser";
import express from "express";
import ViteExpress from "vite-express";
import { userRouter } from "./routers/user.route.js";
import { sequelize } from "./db/index.js";
import { UserModel } from "./models/user.model.js";
import { RoleEnum } from "./config.js";
import { md5 } from "./tools/crypt.js";
import { authRouter } from "./routers/auth.route.js";
import { xnRouter } from "./routers/xn.route.js";
import { courseRouter } from "./routers/course.route.js";

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/xn', xnRouter)
app.use('/api/course', courseRouter)

checkDbConnection().then(() => {
  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000..."),
  );
})

export async function checkDbConnection() {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync();
      console.log('All models were synchronized successfully.');
      const count = await UserModel.count()
      if (count == 0) {
          // 创建超级管理员
          await UserModel.create({
              username: 'super',
              password: md5('super'),
              role: RoleEnum.SUPER,
              name: 'superadmin'
          })
      }
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}