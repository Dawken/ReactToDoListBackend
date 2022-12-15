import * as mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
	login: {
		required: true,
		type: String
	},
	name: {
		required: true,
		type: String
	},
	lastName: {
		required: false,
		type: String
	},
	password: {
		required: true,
		type: String
	},
	gender: {
		required: true,
		type: String
	},
	birthDate: {
		required: true,
		type: String
	}
})

export default mongoose.model('usersAccounts', registerSchema)
