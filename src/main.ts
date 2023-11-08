import type { Application } from "express";
import express from "express";
import { appConfig } from './config/app.config'
import { sequelize } from "./sequelize/sequelize";
import { routes } from "./routes/routes";
import fileUpload from "express-fileupload";
import { resolve } from 'path'
import cors from 'cors'


const app: Application = express()

app.use(cors())

app.set('env', appConfig)

const { port: PORT } = app.get('env')

app.use(express.json())
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
)
app.use('/api/v1', routes)

app.use('/uploads', express.static(resolve('uploads')));
// app.use((req, res, next) => {
//   (req as any).uploads = upload;
//   next();
// })

sequelize
    .authenticate()
    .catch((err: unknown) : undefined => {
        console.log(err);
        return undefined
    })

sequelize.sync({ alter: true })
.catch((err: unknown) : undefined => {
    console.log(err);
    return undefined
})


app.listen(PORT, () => {
    console.log(PORT);
})