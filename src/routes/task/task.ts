const router = require('express').Router()
const Model = require('./taskModel')

router.post('/api/tasks', async(req, res) => {
    console.log(req.user)
    try {
        const data = new Model({
            text: req.body.text,
            date: new Date().toLocaleString(),
            description: '',
            taskStatus: 'todo',
            userID: req.user._id
        })
        const dataToSave = data.save()
        res.status(200).json(dataToSave)
    }
    catch(error) {
        console.log(error)
        res.status(400).json({message: error.message})
    }
})
router.get('/api/tasks', async (req, res) => {
    try {
        const data = await Model.find({userID: req.user._id})
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.delete('/api/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Model.findByIdAndDelete(id)
        res.send()
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.patch('/api/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body
        const options = { new: true }
        const {taskStatus} = req.params
        const {description} = req.params

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options, taskStatus, description
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.get('/api/tasks/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router
