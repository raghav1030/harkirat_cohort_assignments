const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const {username , password} = req.body

    if(!username || !password){
        return res.status(400).send('Bad request')
    }

    if(validateEmail(username).success == false || validatePassword(password).success == false){
        return res.status(404).send('Invalid Credentials')
    }

    if(username.toLowerCase() === "user"){
        try {
            const user = User.create({username, password})
            if(!user){
                return res.status(500).send('Unable to create a User')
            }

            return res.status(200).json({
                message : "User created successfully"
            })
        } catch (error) {
            return res.status(500).send('Internal server error')
        }
    }

    else return res.status(400).json({
        message : "Only User can be created"
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const {courseId} = req.params

    if(!courseId){
        return res.status(400).send('Bad request')
    }

    try{
        const course = await Course.findOne({id : courseId})

        if(!course){
            return res.status(404).send('Course not found')
        }

        return res.status(200).json({
            message : "Course purchased successfully"
        })
    }
    catch(e){
        return res.status(500).send('Internal server error')
    }
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router