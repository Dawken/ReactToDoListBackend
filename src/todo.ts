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

module.exports = router
