const z = require("zod")
function validateUsername(username){
    const emailSchema = z.string()
    return emailSchema.safeParse(username)   
}

function validatePassword(password){
    const passwordSchema = z.string().min(3)
    return passwordSchema.safeParse(password)
}

module.exports = {
    validateUsername,
    validatePassword
}