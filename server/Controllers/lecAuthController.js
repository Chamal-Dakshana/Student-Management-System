const Lecturer = require('../models/lecture')


const lecRegister = async(req,res) => {
    try {
        const{name, subject, email, password} = req.body;
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

        const lecturer = await Lecturer.create({
            name, subject, email, password
        })

        return res.json(lecturer)

    } catch (error) {
        console.log(error)
    }
}


module.exports ={
    lecRegister
}