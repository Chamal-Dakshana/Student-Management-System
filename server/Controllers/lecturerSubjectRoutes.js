const express = require('express');
const router = express.Router();
const Lecturer = require('../models/lecture');
const Subject = require('../models/subject');
const Registration = require('../models/registration');

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

//Student Registered the subject
const regSubject = async (req, res) => {
    const { studentName, subjectName } = req.body;

    try {
        // Check if the student is already registered for this subject
        const existingRegistration = await Registration.findOne({ studentName, subjectName });
        if (existingRegistration) {
            return res.status(400).json({ message: "Already registered for this subject" });
        }

        // If not registered, create a new registration entry
        const registration = new Registration({
            studentName,
            subjectName
        });
        await registration.save();
        res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed" });
    }
};


//Student get the registered subject
const getRegSubject = async (req, res) => {
    const { studentName } = req.query;

    try {
        // Find subjects registered by the student
        const registeredSubjects = await Registration.find({ studentName }).select('subjectName');
        
        if (registeredSubjects.length === 0) {
            return res.status(404).json({ message: "No registered subjects found for this student." });
        }

        res.status(200).json(registeredSubjects);
    } catch (error) {
        console.error("Failed to fetch registered subjects:", error);
        res.status(500).json({ message: "Failed to retrieve registered subjects." });
    }
};

module.exports = {
lecSub,
getRegSubject,
regSubject

}