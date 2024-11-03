const Student = require('../models/student')
const {hashPassword, comparePassword} = require("../helpers/auth")

const test= (req, res) => {
    res.json('Test is working')
}

//Register end point
const registerStudent = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        // Check if name was entered
        if(!name) {
            return res.json({
                error: 'name is required'
            });
        }
        // Check if  password is good
        if(!password || password.lenght > 6) {
            return res.json({
                error: 'Password is required or should be at least 6 character long',
            });
        }
        // Check email
        const exist = await Student.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is taken already'
            });
        }
        const hashedPassword = await hashPassword(password)

        const student = await Student.create({
            name, 
            email, 
            password:hashedPassword,
        }); 

        return res.json(student)
    }catch(error) {
        console.log(error)
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
        if(match){
            res.json('Password match')
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

module.exports = {
    test,
    registerStudent,
    loginStudent
}