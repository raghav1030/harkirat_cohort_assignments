// Middleware for handling auth
const {validatePassword, validateUsername} = require("../validators/index")


function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const {username , password} = req.headers

    if(!username || !password){
        return res.status(400).send('Bad request')
    }

    if(validateEmail(username).success == false || validatePassword(password).success == false){
        return res.status(404).send('Invalid Credentials')
    }

    if(username.toLowerCase() !== "admin"){
        return res.status(401).send("This page is only authorised for admins")
    }

    next()
}

module.exports = adminMiddleware;