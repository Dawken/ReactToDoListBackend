import {FormData, formValidator} from "./formValidator"

const formModel = require('./formModel')
const formRouter = require('express').Router()

formRouter.post('/api/register', async(req, res) => {
    try {
        await formValidator(FormData, req.body)
        const data = new formModel({
            login: req.body.login,
            name: req.body.name,
            lastName: req.body.lastName,
            password: req.body.password,
            gender: req.body.gender,
            birthDate: req.body.birthDate
        })
        const dataToSave = data.save()
        res.status(200).json(dataToSave)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})
formRouter.get('/api/register', async(req, res) => {
    try {
        const data = await formModel.find()
        res.json(data)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = formRouter
