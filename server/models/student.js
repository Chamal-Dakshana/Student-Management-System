const mongoose = require('mongoose')
const {Schema} = mongoose

const studentSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const studentModel = mongoose.model('student', studentSchema)

module.exports = studentModel

