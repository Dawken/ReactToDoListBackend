import {RegisterDTO} from './registerDTO'
import {bodyValidator} from '../../shared/bodyValidator'
import * as mongoose from 'mongoose'
import {response} from 'express'
const bcrypt = require('bcrypt')

const formModel = require('./registerModel')
const formRouter = require('express').Router()

formRouter.post('/api/register', async(req, res) => {
	try {
		await bodyValidator(RegisterDTO, req.body)
		const birth = req.body.birthDate
		const date18YearsAgo = new Date()
		date18YearsAgo.setFullYear(date18YearsAgo.getFullYear()-18)
		if(new Date(birth) >= date18YearsAgo) {
			return res.status(400).json({message: 'You have to be at least 18 years old'})
		}
		const userLogin = await formModel.findOne({login: req.body.login}, 'login').exec()
		if(userLogin) {
			return res.status(400).json({message:'User already exist!'})
		}
		if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(req.body.password)) {
			return res.status(400).json({
				message: '\'Password need to has at least 1 Capital letter, 1 special symbol, 1 number and be 8 symbols long\''
			})
		}
		const hashedPassword = bcrypt.hashSync(req.body.password, 10)
		const data = new formModel({
			login: req.body.login,
			name: req.body.name,
			lastName: req.body.lastName,
			password: hashedPassword,
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
formRouter.post('/api/login', async(req, res) => {
	try {
		const password = await formModel.findOne({login: req.body.login}, 'password').exec()
		res.status(200).json(bcrypt.compareSync(req.body.password, password.password))
	}
	catch (error) {
		console.log(error)
	}
})

module.exports = formRouter
