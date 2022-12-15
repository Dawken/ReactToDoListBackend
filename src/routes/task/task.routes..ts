import {Router} from 'express'
import Task from './taskModel'

const router = Router()

router.post('/api/tasks', async(req, res) => {
	try {
		const {text} = req.body
		if(text === '') {
			return res.status(400).json({message: 'Text is empty!'})
		}
		const data = new Task({
			text: req.body.text,
			date: new Date().toLocaleString(),
			description: '',
			taskStatus: 'todo',
			userId: req.user._id
		})
		console.log(req.user)
		const dataToSave = data.save()
		res.status(200).json(dataToSave)
	}
	catch(error) {
		res.status(400).json({message: error.message})
	}
})
router.get('/api/tasks', async(req, res) => {
	try {
		const data = await Task.find({userId: req.user._id})
		res.json(data)
	}
	catch(error){
		res.status(500).json({message: error.message})
	}
})
router.delete('/api/tasks/:id', async(req, res) => {
	try {
		const {id} = req.params
		await Task.findByIdAndDelete(id)
		res.send()
	}
	catch (error) {
		res.status(400).json({message: error.message})
	}
})
router.patch('/api/tasks/:id', async(req, res) => {
	try {
		const updatedData = req.body
		const {id} = req.params
		const taskDescription = await Task.findById(req.params.id)
		if(taskDescription.description === updatedData.description) {
			return res.status(400).json({message: 'Description didn\'t change!'})
		}
		const result = await Task.findByIdAndUpdate(id, updatedData)
		const data = await Task.findById(req.params.id)
		if(data.userId === req.user._id) {
			res.send(result)
		}
	}
	catch (error) {
		res.status(400).json({message: error.message})
	}
})
router.get('/api/tasks/:id', async (req, res) => {
	try{
		const data = await Task.findById(req.params.id)
		if(data.userId === req.user._id) {
			res.json(data)
		}
	}
	catch(error){
		res.status(500).json({message: error.message})
	}
})

export default router
