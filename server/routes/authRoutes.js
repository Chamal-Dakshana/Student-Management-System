const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerStudent, loginStudent} = require('../Controllers/authControllers')

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
module.exports = router