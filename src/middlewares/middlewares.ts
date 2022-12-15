import jwt from 'jsonwebtoken'

const localhost = process.env.ORIGIN

const corsOptions = {
	origin: localhost,
	credentials: true
}

const authenticateToken = (req, res, next) => {
	const {AuthToken} = req.cookies
	if (AuthToken === null) return res.status(401).send()
	jwt.verify(AuthToken, process.env.TOKEN_SECRET as string, (err: Error, user: object) => {
		if (err) return res.status(403).send()
		req.user = user
		next()
	})
}
export {authenticateToken, corsOptions}

