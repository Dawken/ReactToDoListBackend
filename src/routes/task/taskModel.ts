import mongoose from 'mongoose'

const userTaskSchema = new mongoose.Schema({
	text: {
		required: true,
		type: String
	},
	date: {
		required: true,
		type: String
	},
	description: {
		required: false,
		type: String
	},
	taskStatus: {
		required: true,
		type: String
	},
	userId : {
		required: true,
		type: String
	}
})

export default mongoose.model('userTasks', userTaskSchema)
