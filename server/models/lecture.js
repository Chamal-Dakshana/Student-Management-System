const mongoose = require('mongoose')
const {Schema} = mongoose

const lecturerSchema = new Schema({
    name: String,
    subject: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const LecturerModel = mongoose.model('Lecturer', lecturerSchema)

module.exports = LecturerModel