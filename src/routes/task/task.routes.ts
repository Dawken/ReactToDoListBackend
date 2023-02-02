import { Router } from 'express'
import Task from './taskModel'
import { bodyValidator } from '../../shared/bodyValidator'
import { TaskToUpdateDTO } from './taskToUpdateDTO'

const router = Router()

router.post('/api/tasks', async (req, res) => {
	try {
		await bodyValidator(TaskToUpdateDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
	try {
		const data = new Task({
			text: req.body.text,
			date: new Date().toLocaleString('pl'),
			description: '',
			taskStatus: 'todo',
			userId: req.user._id,
		})
		const dataToSave = data.save()
		res.status(201).json(dataToSave)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
router.get('/api/tasks', async (req, res) => {
	try {
		const data = await Task.find({ userId: req.user._id })
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
router.delete('/api/tasks/:id', async (req, res) => {
	try {
		const { id } = req.params
		const data = await Task.findById(req.params.id)

		if (!data) {
			res.status(204).send({ message: 'Task does not exist!' })
		} else if (data.userId === req.user._id) {
			await Task.findByIdAndDelete(id)
			res.status(200).send()
		} else {
			res.status(403).send({ message: 'Task does not belong to user' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
router.patch('/api/tasks/:id', async (req, res) => {
	const updatedData = req.body
	try {
		await bodyValidator(TaskToUpdateDTO, updatedData)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
	try {
		const data = await Task.findById(req.params.id)
		if (
			JSON.stringify(updatedData) === '{}' ||
			(data.taskStatus === updatedData.taskStatus &&
				data.text === updatedData.text &&
				data.description === updatedData.description)
		) {
			return res.status(400).json({ errorCode: 'nothing-changed' })
		}
		const { id } = req.params

		if (data.userId === req.user._id) {
			const result = await Task.findByIdAndUpdate(id, updatedData)
			res.status(200).send(result)
		} else {
			res.status(403).send({ message: 'Task doesn\'t belong to user' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
router.get('/api/tasks/:id', async (req, res) => {
	try {
		const data = await Task.findById(req.params.id)
		if (data.userId === req.user._id) {
			res.status(200).json(data)
		} else {
			res.status(403).send({ message: 'Task doesn\'t belong to user' })
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

export default router
