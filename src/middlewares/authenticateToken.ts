import jwt from 'jsonwebtoken'
import {Register} from '../types/Register'
import {NextFunction, Request, Response} from 'express'

const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
	const {AuthToken} = req.cookies
	if (AuthToken === null) return res.status(401).send()
	jwt.verify(AuthToken, process.env.TOKEN_SECRET as string, (err: Error, user: Register) => {
		if (err) return res.status(401).send()
		req.user = user
		next()
	})
}
export default authenticateToken

