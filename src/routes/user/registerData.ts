import {RegisterDTO} from './registerDTO'
import {bodyValidator} from '../../shared/bodyValidator'

const formModel = require('./registerModel')
const formRouter = require('express').Router()

formRouter.post('/api/register', async(req, res) => {
	try {
		await bodyValidator(RegisterDTO, req.body)
		const birth = req.body.birthDate
		const date18YearsAgo = new Date()
		date18YearsAgo.setFullYear(date18YearsAgo.getFullYear()-18)
		if(new Date(birth) >= date18YearsAgo) {
			return res.status(400).json({message: 'You have to be atleast 18 years old'})
		}
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
