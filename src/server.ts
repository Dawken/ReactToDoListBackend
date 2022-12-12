import cookieParser from 'cookie-parser'

require('dotenv').config();
import express from 'express'
const mongoose = require('mongoose');
const cors = require("cors");
const mongoString = process.env.DATABASE_URL
const apiRoute = require('./routes/task/task')
const formRoute = require('./routes/user/registerData')
const jwt = require('jsonwebtoken')

const app = express()

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

mongoose.connect(mongoString,{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected')
})
const authenticateToken = (req, res, next) => {
    const {AuthToken} = req.cookies
    if (AuthToken === null) return res.status(401).send()
    jwt.verify(AuthToken, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).send()
        req.user = user
        next()
    })
}
app.set('Access-Control-Allow-Credentials', true)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(formRoute)
app.use(authenticateToken)
app.use(apiRoute)



app.listen(5000, () => { console.log('Server started at 5000')})
