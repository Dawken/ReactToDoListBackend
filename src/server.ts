require('dotenv').config();
import express from 'express'
const mongoose = require('mongoose');
const cors = require("cors");
const mongoString = process.env.DATABASE_URL
const apiRoute = require('./task/todo')
const formRoute = require('./form/form')

const app = express()

const corsOptions = {
    origin: "http://localhost:3000"
};

mongoose.connect(mongoString,{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.use(formRoute)
app.use(apiRoute)



app.listen(5000, () => { console.log('Server started at 5000')})
