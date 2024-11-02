const student = require('../models/student')

const test= (req, res) => {
    res.json('Test is working')
}

const registerStudent = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        // Check if name was entered
        if(!name) {
            return res.json({
                massage: 'name is required'
            })
        };
        // Check if  password is good
        if(!password || password.lenght < 6) {
            return res.json({
                massage: 'Password is required or should be at least 6 character long'
            })
        };
        // Check email
        const exist = await student.findOne({email});
        if(exist){
            return res.json({
                massage: 'Email is taken'
            })
        }
    }catch(massage) {
        console.log(massage)
    }
}

module.exports = {
    test,
    registerStudent
}