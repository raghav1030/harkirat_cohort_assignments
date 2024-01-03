const {Admin, User} = require("../db")
const { validatePassword, validateUsername } = require("../validators/index")
// import {Admin, User} from '../db'

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const {username , password} = req.headers


    if(!username || !password){
        return res.status(400).send('Bad request')
    }

    if(validateUsername(username).success == false || validatePassword(password).success == false){
        return res.status(400).send('Invalid Credentials')
    }

    if(username.toLowerCase() !== "user"){
        return res.status(401).send("This page is only authorised for users")
    }

    try {
        const validateUser = User.findOne({username, password})
        
        if(!validateUser){
            return res.status(404).send('User not found')
        }

        next()

    } catch (error) {
        return res.status(500).send('Internal server error')
    }

}
module.exports = userMiddleware;
