import { RegisterDTO } from './registerDTO'
import { bodyValidator } from '../../shared/bodyValidator'
import bcrypt from 'bcrypt'
import { config } from 'dotenv'
import UserAccount from './userAccountModel'
import { Router } from 'express'
import generateAccessToken from '../../accessToken'
import { LoginDTO } from './loginDTO'

config()

const userAccountRouter = Router()

userAccountRouter.post('/api/register', async (req, res) => {
	try {
		await bodyValidator(RegisterDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
	try {
		const userLogin = await UserAccount.findOne(
			{ login: req.body.login },
			'login'
		).exec()
		if (userLogin) {
			return res.status(400).json({ errorCode: 'user-already-exist' })
		}
		const hashedPassword = bcrypt.hashSync(req.body.password, 10)
		const data = new UserAccount({
			login: req.body.login,
			name: req.body.name,
			lastName: req.body.lastName,
			password: hashedPassword,
			gender: req.body.gender,
		})
		const dataToSave = data.save()
		res.status(200).json(dataToSave)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

userAccountRouter.post('/api/login', async (req, res) => {
	try {
		await bodyValidator(LoginDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
	try {
		const user = await UserAccount.findOne({ login: req.body.login }).exec()
		if (!user) {
			res.status(400).json({ errorCode: 'user-does-not-exist' })
		} else if (bcrypt.compareSync(req.body.password, user.password)) {
			const token = generateAccessToken(user.toJSON())
			const expires = new Date(Date.now() + 3600 * 1000)
			res.setHeader(
				'Set-Cookie',
				`AuthToken=${token}; Max-Age=3600; Path=/; Expires=${expires.toUTCString()}; HttpOnly; Secure; SameSite=None;`
			)
			res.status(200).send({ message: 'Logged' })
		} else {
			res.status(400).json({ errorCode: 'incorrect-password' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
userAccountRouter.post('/api/logout', async (req, res) => {
	try {
		res.clearCookie('AuthToken', {
			httpOnly: true,
		})
		res.status(200).send({ message: 'Logout!' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
export default userAccountRouter
