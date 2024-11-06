const Student = require('../models/student')
const {hashPassword, comparePassword} = require("../helpers/auth")
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path')

const test= (req, res) => {
    res.json('Test is working')
}


//Register end point
const registerStudent = async(req, res) => {
    try {
        const { name, email, password, profileImage } = req.body;
    
        // Check required fields
        if (!name || !email || !password || !profileImage) {
          return res.json({ error: 'All fields, including profile image, are required' });
        }
    
        // Check if email already exists
        const exist = await Student.findOne({ email });
        if (exist) {
          return res.json({ error: 'Email is taken already' });
        }
    
        // Check password length
        if (password.length < 6) {
          return res.json({ error: 'Password should be at least 6 characters long' });
        }
    
        const hashedPassword = await hashPassword(password);
    
        // Decode the base64 image string and save it to the filesystem (optional)
        const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, "");
        const imagePath = `../server/image/${Date.now()}.png`;
        fs.writeFileSync(imagePath, base64Data, { encoding: 'base64' });
    
        const student = await Student.create({
          name,
          email,
          password: hashedPassword,
          profileImage: imagePath, // Store the path in DB
        });
    
        return res.json(student);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
      }
}

//Loging endpoint
const loginStudent = async (req,res) => {
    try {
        const {email,password} = req.body;

        //Check if user exists
        const student = await Student.findOne({email});
        if(!student) {
            return res.json({
                error: 'No Student Found'
            })
        }

        //Check the password match
        const match = await comparePassword(password, student.password)
        if(match) {
            jwt.sign({email: student.email, id: student._id, name:student.name, profileImage:student.profileImage}, process.env.JWT_SECRET, {}, (err, token) =>{
                if(err) throw err;
                res.cookie('token', token).json(student)
            })
        }
        if(!match){
            res.json({
                error: 'Password do not match'
            })
        }
    } catch (error) {
        console.log(error)
    }
    
}

const getProfile = (req, res) => {
const {token} = req.cookies
if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, student) =>{
        if(err) throw err
        res.json(student)
    }) 
}else{
    res.json(null)
}
}

module.exports = {
    test,
    registerStudent,
    loginStudent,
    getProfile
}