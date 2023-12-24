const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {validatePassword, validateUsername} = require("../validators/index")
const {Admin, Course, User} = require("../db/index")

// Admin Routes
router.post('/signup',async(req, res) => {
    // Implement admin signup logic
    const {username , password} = req.body

    if(!username || !password){
        return res.status(400).send('Bad request')
    }

    if(validateEmail(username).success == false || validatePassword(password).success == false){
        return res.status(404).send('Invalid Credentials')
    }

    if(username.toLowerCase() === "admin"){
        try {
            const user = await User.create({username, password})
            if(!user){
                return res.status(500).send('Unable to create an Admin')
            }

            return res.status(200).json({
                message : "Admin created successfully"
            })
        } catch (error) {
            return res.status(500).send('Internal server error')
        }
    }

    else return res.status(400).json({
        message : "Only Admins can be created"
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const {title, description, price, imageLink} = req.body

    if(!title || !description  || !price || !imageLink){
        return res.status(400).send('Bad request')
    }


    try {

        const allCourses = await Course.find({})
        const id = allCourses.length + 1
        const course = await Course.create({id , title, description, price, imageLink})
        
        return res.status(200).json({
            message : "Course created successfully",
            courseId : id
        })
        
    } catch (error) {
        return res.status(500).send('Unable to create a course...Internal server error')
    }

    

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({})

        if(courses.length === 0){
            return res.status(404).send('No course found')
        }
        
        return res.status(200).json({
            message : "Courses fetched successfully",
            courses : courses
        })
    } catch (error) {
        return res.status(500).send('Unable to fetch courses...Internal server error')        
    }

});

module.exports = router;