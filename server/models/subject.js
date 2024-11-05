const mongoose = require('mongoose')
const {Schema} = mongoose

const subjectSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const SubjectModel = mongoose.model('Subject', subjectSchema)

module.exports = SubjectModel