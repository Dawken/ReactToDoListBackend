const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
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
    userID : {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)
