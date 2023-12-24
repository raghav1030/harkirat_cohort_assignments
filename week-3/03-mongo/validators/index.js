const z = require("zod")
export function validateUsername(username){
    const emailSchema = z.string()
    return emailSchema.safeParse(username)   
}

export function validatePassword(password){
    const passwordSchema = z.string().min(3)
    return passwordSchema.safeParse(password)
}