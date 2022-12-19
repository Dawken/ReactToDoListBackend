import {RegisterDTO} from './registerDTO'
import {bodyValidator} from '../../shared/bodyValidator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
import Register from './registerModel'
import {Router} from 'express'
import {User} from '../../types/customUser'

config()

const registerRouter = Router()

registerRouter.post('/api/register', async(req, res) => {
	try {
		await bodyValidator(RegisterDTO, req.body)
		const birth = req.body.birthDate
		const date18YearsAgo = new Date()
		date18YearsAgo.setFullYear(date18YearsAgo.getFullYear()-18)
		if(new Date(birth) >= date18YearsAgo) {
			return res.status(401).json({message: 'You have to be at least 18 years old'})
		}
		const userLogin = await Register.findOne({login: req.body.login}, 'login').exec()
		if(userLogin) {
			return res.status(400).json({message:'User already exist!'})
		}
		const hashedPassword = bcrypt.hashSync(req.body.password, 10)
		const data = new Register({
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
const generateAccessToken = (userAccountData:User) => {
	return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
}

registerRouter.post('/api/login', async(req, res) => {
	try {
		const user = await Register.findOne({login: req.body.login}).exec()
		if(bcrypt.compareSync(req.body.password, user.password)) {
			delete user.password
			const token = generateAccessToken(user.toJSON())
			res.cookie(
				'AuthToken',
				token,
				{
					maxAge: 1800 * 1000,
					httpOnly: true
				}
			)
			res.status(200).send({message: 'Logged'})
		} else {
			res.status(400).json({message: 'Password doesn\'t match!'})
		}
	}
	catch (error) {
		res.status(400).json({message: error.message})
	}
})

export default registerRouter
