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
    lastName: {
        required: false,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String
    },
    birthDate: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('formData', formSchema)
