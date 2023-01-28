import { UserAccount } from '../types/Register'

declare global {
	export namespace Express {
		export interface Request {
			user?: UserAccount;
		}
	}
}
