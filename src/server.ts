import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import apiRoute from './routes/task/task.routes'
import userAccountRouter from './routes/userAccount/userAccount.routes'
import authenticateToken from './middlewares/authenticateToken'
import { mongoDb } from './shared/mongoDbUrl'

config()
const app = express()

const mongoConnectionString = mongoDb.url
const localhost = process.env.ORIGIN

const corsOptions = {
	origin: localhost,
	credentials: true,
}

mongoose.connect(mongoConnectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})

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
app.use(userAccountRouter)
app.use(authenticateToken)
app.use(apiRoute)
const PORT = process.env.NODE_DOCKER_PORT || 8080

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`)
})
