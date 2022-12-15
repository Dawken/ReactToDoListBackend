import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import apiRoute from './routes/task/task.routes.'
import registerRouter from './routes/register/registerData.routes.'
import {authenticateToken, corsOptions} from './middlewares/middlewares'


const mongoString = process.env.DATABASE_URL
config()
const app = express()

mongoose.connect(mongoString,{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false })

const database = mongoose.connection

database.on('error', (error) => {
	console.log(error)
})

database.once('connected', () => {
	console.log('Database Connected')
})

app.set('Access-Control-Allow-Credentials', true)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(registerRouter)
app.use(authenticateToken)
app.use(apiRoute)

app.listen(5000, () => { console.log('Server started at 5000')})
