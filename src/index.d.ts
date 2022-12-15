import {User} from './types/customUser'

export {}

declare global {
	namespace Express {
		export interface Request {
			user?: User
		}
	}
}
