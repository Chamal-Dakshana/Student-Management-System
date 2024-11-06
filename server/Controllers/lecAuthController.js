const Lecturer = require('../models/lecture')
const {hashPassword, comparePassword} = require("../helpers/auth")
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../server/image')  // Folder where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))  // Unique file name with original extension
    }
})

const upload = multer({ storage })

const lecRegister = async(req,res) => {
    try {
        const{name, subject, email, password} = req.body;
        const file = req.file;
        //Check if name was entered
        if(!name){
            return res.json({
                error: 'name is required'
            })
        };
        //Check the subject was entered
        if(!subject){
            return res.json({
                error: 'Subject is required'
            })
        };
        // Check if an image file was uploaded
        if (!file) {
            return res.json({ error: 'Lecturer Profile image is required' });
        };
        // Check is Password is good  
        if (!password || password.length < 6){
            return res.json({
                error: 'Password is require and should be least 6 character long'
            })
        };
        //Check the email
        const exist = await Lecturer.findOne({email})
        if(exist){
            return res.json({
                error: 'email is taken already.'
            })
        }

        const hashedPassword = await hashPassword(password)
        //create the lecturer in database
        const lecturer = await Lecturer.create({
            name, 
            subject, 
            email, 
            password:hashedPassword,
            lecprofileImage: file.path
        })

        return res.json(lecturer)

    } catch (error) {
        console.log(error)
    }
};

//lecturer login end point

const lecSign = async(req,res) => {
    try {
        const {email,password} = req.body;

        //check if user exists
        const lecturer = await Lecturer.findOne({email});
        if(!lecturer) {
            return res.json({
                error: 'Invalid Email!'
            })
        }

         //Check the password match
         const match = await comparePassword(password, lecturer.password)
         if(match) {
             jwt.sign({name:lecturer.name,subject: lecturer.subject, id: lecturer._id, email: lecturer.email, lecprofileImage:lecturer.lecprofileImage }, process.env.JWT_SECRET, {}, (err, token) =>{
                 if(err) throw err;
                 res.cookie('token', token).json(lecturer)
             })
         }

        if(!match){
            res.json({
                error: 'Password do not match'
            })
        }
    }catch(error){
        console.log(error)
    }
}

const getProfileLec = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, lecturer) =>{
            if(err) throw err
            res.json(lecturer)
        }) 
    }else{
        res.json(null)
    }
    }

module.exports ={
    lecRegister :[upload.single('lecprofileImage'), lecRegister],  // Middleware for image upload,
    lecSign,
    getProfileLec
}