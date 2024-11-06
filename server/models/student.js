const mongoose = require('mongoose')
const {Schema} = mongoose

const studentSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    profileImage: { type: String }
})

const StudentModel = mongoose.model('Student', studentSchema)

module.exports = StudentModel

