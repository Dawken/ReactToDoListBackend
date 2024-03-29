import * as mongoose from 'mongoose'

interface UserInterface extends mongoose.Document {
	_id: string;
	login: string;
	name: string;
	lastName: string;
	password: string;
	gender: string;
}

const userAccountSchema = new mongoose.Schema({
	login: {
		required: true,
		type: String,
	},
	name: {
		required: true,
		type: String,
	},
	lastName: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
	gender: {
		required: false,
		type: String,
	},
})

export default mongoose.model<UserInterface>('userAccount', userAccountSchema)
