const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
    studentName: String,
    subjectName: String
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;