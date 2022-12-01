const router = require('express').Router()
const Model = require('./task/task');

router.post('/api/task', async(req, res) => {
    const data = new Model({
        text: req.body.text,
        date: new Date().toLocaleString(),
        description: '',
        taskStatus: 'todo'
    })
    try{
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.text} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const {taskStatus} = req.params

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options, taskStatus
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router
