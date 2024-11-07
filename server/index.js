const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const app = express();

//put database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log ('Database Connected Successfully.'))
.catch((error) => console.log ('Datbase not connected.', error))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))


app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))