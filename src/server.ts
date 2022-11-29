require('dotenv').config();
import express from 'express'
const mongoose = require('mongoose');
const cors = require("cors");
const mongoString = process.env.DATABASE_URL

const app = express()

const corsOptions = {
    origin: "http://localhost:5000"
};

mongoose.connect(mongoString,{ useNewUrlParser: true , useUnifiedTopology: true });
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
app.use(require('./todo'))

app.listen(5000, () => { console.log('Server started at 5000')})
