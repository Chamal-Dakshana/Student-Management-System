const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerStudent} = require('../Controllers/authControllers')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerStudent)

module.exports = router