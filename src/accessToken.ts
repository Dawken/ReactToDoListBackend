import { UserAccount } from './types/Register'
import jwt from 'jsonwebtoken'

const generateAccessToken = (userAccountData: UserAccount) => {
	return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {
		expiresIn: '1800s',
	})
}
export default generateAccessToken
