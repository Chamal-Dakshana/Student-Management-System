const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerStudent, loginStudent, getProfile} = require('../Controllers/authControllers')
const {lecRegister} = require('../Controllers/lecAuthController')

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

module.exports = router