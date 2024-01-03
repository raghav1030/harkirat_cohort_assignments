const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User  } = require("../db");
const {validateEmail, validatePassword, validateUsername} = require("../validators/index")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const {username , password} = req.body

    if(!username || !password){
        return res.status(400).send('Bad request')
    }

    if(validateUsername(username).success == false || validatePassword(password).success == false){
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

router.get('/courses', userMiddleware, async(req, res) => {
    // Implement listing all courses logic
    console.log(req.params.courseId)
    try {
        const courses = await Course.find({})
    
        if(courses.length === 0){
            return res.status(404).send('No courses found')
        }
    
        return res.status(200).json({
            success : true,
            courses : courses
        })
        
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
    
    

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const {courseId} = req.params
    const {username} = req.headers
    

    if(!courseId){
        return res.status(400).send('Bad request')
    }

    try{
        const user = await User.findOneAndUpdate({username : username}, {$push : {coursesPurchased : courseId}}, {new : true})
        const course = await Course.findOneAndUpdate({_id : courseId}, {$push : {enrolledUsers : user._id}}, {new : true})
        console.log(course)
        console.log(user)
        if(!course){
            return res.status(404).send('Course not found')
        }

        return res.status(200).json({
            message : "Course purchased successfully",
            course : course,
            user : user
        })
    }
    catch(e){
        return res.status(500).send('Internal server error')
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const {username, password} = req.headers

    if(!username || !password){
        return res.status(400).send('Bad request')
    }

    try {
        const courses = await User.find({
            username : username,
        }).populate("coursesPurchased").exec()

        if(courses.length === 0){
            return res.status(404).send('No courses found')
        }

        return res.status(200).json({
            success : true,
            courses : courses
        })
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
});

module.exports = router