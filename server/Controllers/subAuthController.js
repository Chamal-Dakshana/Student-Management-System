const Subject = require('../models/subject')
const {hashPassword, comparePassword} = require("../helpers/auth")
const jwt = require('jsonwebtoken')


//Register end point
const registerSubject = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        // Check if name was entered
        if(!name) {
            return res.json({
                error: 'name is required'
            });
        }

        const exist1 = await Subject.findOne({name});
        if(exist1){
            return res.json({
                error: 'This Subject is Already Exist'
            });
        }

        // Check if  password is good
        if(!password || password.lenght > 6) {
            return res.json({
                error: 'Password is required or should be at least 6 character long',
            });
        }
        // Check email
        const exist = await Subject.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is taken already'
            });
        }
        const hashedPassword = await hashPassword(password)

        const subject = await Subject.create({
            name, 
            email, 
            password:hashedPassword,
        }); 

        return res.json(subject)
    }catch(error) {
        console.log(error)
    }
}

//Loging endpoint
const subSign = async (req,res) => {
    try {
        const {email,password} = req.body;

        //Check if user exists
        const subject = await Subject.findOne({email});
        if(!subject) {
            return res.json({
                error: 'No Subject Found'
            })
        }

        //Check the password match
        const match = await comparePassword(password, subject.password)
        if(match) {
            jwt.sign({email: subject.email, id: subject._id, name:subject.name}, process.env.JWT_SECRET, {}, (err, token) =>{
                if(err) throw err;
                res.cookie('token', token).json(subject)
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

const getProfileSub = (req, res) => {
const {token} = req.cookies
if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, subSign) =>{
        if(err) throw err
        res.json(subSign)
    }) 
}else{
    res.json(null)
}
}

module.exports = {
    registerSubject,
    subSign,
    getProfileSub
}