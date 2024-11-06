const express = require('express');
const router = express.Router();
const Lecturer = require('../models/lecture');
const Subject = require('../models/subject');

const lecSub= async (req, res) => {

    try {
        const lecturers = await Lecturer.find({});
        const subjects = await Subject.find({});

        const results = lecturers .map(lecturer => {
            const matchingSubject = subjects.find(subject => subject.name === lecturer.subject);
            if (matchingSubject){
                return { lecture_name: lecturer.name, subject: lecturer.subject };
            }
        })
        .filter(Boolean);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = lecSub;