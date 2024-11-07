const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerStudent, loginStudent, getProfile} = require('../Controllers/authControllers')
const {lecRegister,lecSign, getProfileLec} = require('../Controllers/lecAuthController')
const { registerSubject, subSign, getProfileSub} = require('../Controllers/subAuthController')
const {lecSub, regSubject, getRegSubject} = require('../Controllers/lecturerSubjectRoutes');

//middleware
router.use(   
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerStudent)
router.post('/login', loginStudent)
router.get('/profile',getProfile)
router.post('/lecregister', lecRegister)
router.post('/lecsign',lecSign)
router.get('/profileLec',getProfileLec)
router.post('/subregister', registerSubject)
router.post('/subsignin',subSign)
router.get('/profileSub',getProfileSub)
router.get('/lecturer-subjects',lecSub)
router.post('/register-subject',regSubject)
router.get('/registered-subjects',getRegSubject)


module.exports = router