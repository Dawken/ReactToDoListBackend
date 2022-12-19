import jwt from 'jsonwebtoken'
import {User} from '../types/customUser'
import {NextFunction, Request, Response} from 'express'


const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
	const {AuthToken} = req.cookies
	if (AuthToken === null) return res.status(401).send()
	jwt.verify(AuthToken, process.env.TOKEN_SECRET as string, (err: Error, user: User) => {
		if (err) return res.status(403).send()
		req.user = user
		next()
	})
}
export default authenticateToken

