import mongoose from 'mongoose'

interface TaskInterface extends mongoose.Document {
	userId: string;
	description: string;
	taskStatus: string;
	text: string;
}

const userTaskSchema = new mongoose.Schema({
	text: {
		required: true,
		type: String,
	},
	date: {
		required: true,
		type: String,
	},
	description: {
		required: false,
		type: String,
	},
	taskStatus: {
		required: true,
		type: String,
	},
	userId: {
		required: true,
		type: String,
	},
})

export default mongoose.model<TaskInterface>('userTask', userTaskSchema)
