import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'
import bodyparser from 'body-parser'
import loginRouter from './routes/login.js'
import registerRouter from './routes/register.js'
import workingHoursRouter from './routes/workingHours.js'
import { extractToken } from "./auth.js";
dotenv.config()
mongoose.connect(process.env.mongoConnectionUrl)
const app = express()
app.use(bodyparser.json())
app.use(cors())
app.use(extractToken)
app.use('/',loginRouter)
app.use('/',registerRouter)
app.use('/',workingHoursRouter)
app.listen(process.env.port, () => {
    console.log(`started on http://localhost:${process.env.port}`)
})