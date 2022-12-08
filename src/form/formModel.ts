import * as mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    login: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    secondName: {
        required: false,
        type: String
    },
    gender: {
        required: true,
        type: String
    },
    birthDate: {
        required: true,
        type: String
    },
    password: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('formData', formSchema)
