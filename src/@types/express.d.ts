import {Register} from '../types/Register'

declare global {
	export namespace Express {
		export interface Request {
			user?: Register
		}
	}
}
