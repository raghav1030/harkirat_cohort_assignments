// Middleware for handling auth
const {validatePassword, validateUsername} = require("../validators/index")
const {Admin} = require('../db')
const express = require('express');
const router = express.Router();

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const {username , password} = req.headers

    if(!username || !password){
        return res.status(400).send('Bad request')
    }

    if(validateUsername(username).success == false || validatePassword(password).success == false){
        return res.status(404).send('Invalid Credentials')
    }

    if(username.toLowerCase() !== "admin"){
        return res.status(401).send("This page is only authorised for admins")
    }

    try {
        const validateAdmin = await Admin.findOne({username, password})
        if(!validateAdmin){
            return res.status(401).send("User not found")
        }
        next()
    } catch (error) {
       return res.status(500).send('Internal server error') 
    }

}

module.exports = adminMiddleware;