import {User} from '../types/customUser'

// export interface RequestCustom extends Request {
// 	user?: User,
// 	cookies: {
// 		AuthToken: string
// 	}
// }
// export interface ResponseCustom extends Response {
// 	status: (number:number) => any
// }

declare global {
	namespace Express {
		interface Request {
			user?: User
		}
	}
}
// 	interface Response {
// 		status?: any
// 	}
//
// }

