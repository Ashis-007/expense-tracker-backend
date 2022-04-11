const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = process.env.SALT_ROUNDS
const jwt = require("jsonwebtoken")

const User = require("../models/index")



const {successResponse,createdSuccessResponse,
    notFoundResponse,unauthorizedResponse,
    badRequestResponse,forbiddenResponse,
serverErrorResponse,googleAccessDeniedResponse,
unprocessableEntityResponse,} = require("../utils/response")

//Repo
const UserRepository = require("../repository/user.repository")

//Joi
const {signUpUserSchema, loginUserSchema} = require("../joi/auth/user")



exports.user_signup = async (req, res) =>{
    try {
        let body = signUpUserSchema.validate(req.body)
        if(body.error) return unprocessableEntityResponse(res, body.error.message)
        body = body.value

        const hash = await bcrypt.hash(req.body.password, saltRounds)
        req.body.password = hash

        const [user, errForUser] = await UserRepository.createUser(req.body)
        if(errForUser) return badRequestResponse(res, errForUser)

        return createdSuccessResponse(res, "Successfully created user", user)
        }catch(err){
            return serverErrorResponse(res)
        }
    }





exports.user_login = async (req, res)=>{
    try{
        const {email, password} = req.body
        const [user, userError] = await UserRepository.getUser({email})
        if(userError)
        return notFoundResponse(res, "Auth Failed")
        if(await bcrypt.compare(password, user.password)){
              const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, process.env.JWT_KEY,{
                    expiresIn: "1h"
                })
                const data = {token, ...user.toJSON()}
                return successResponse(res, "Login Successfull", data)
        }
    }catch(err){
        return serverErrorResponse(res)
    }
}


exports.user_delete = async (req, res) =>{
    try{
    const [user, errForUser] = await UserRepository.deleteUser(req.body)
    if(errForUser){
        return badRequestResponse(res, errForUser)
    }
    return createdSuccessResponse(res, "Deleted user successfully", user)
}catch(err){
    return serverErrorResponse(res)
}
}





//Signup Route

// (req, res) =>{
//     User.find({email: req.body.email})
//     .then(user =>{
//         if(user.length > 1){
//             return badRequestResponse(res, "Access denied")
//         } else{
//             bcrypt.hash(req.body.password, saltRounds, (err, hash) =>{
//                 if(err) {
//                     return serverErrorResponse(res, "Server error")
//                 } else {
//                     const user = new User({
//                         first_name: req.body.first_name,
//                         last_name: req.body.last_name,
//                         email: req.body.email,
//                         password: hash
//                     })
//                     user.save()
//                     .then(result =>{
//                         createdSuccessResponse(res, "Sucessfully created user")
//                     })
//                     .catch(err =>{
//                         console.log(err)
//                         serverErrorResponse(res, "Server error")
//                     })
//                 }
//             })
//         }
//     })
// }

//delete Route

//  User.remove({email: req.body.email})
//     .then(result =>{
//         response.successResponse(res, "User deleted successfully")
//     }).catch(err =>{
//         console.log(err)
//         response.serverErrorResponse(res, "Server error")
//     })

//Login Route

// User.find({email: req.body.email})
//     .then(user =>{
//         if(user.length < 1){
//             return unauthorizedResponse(res, "Access denied")
//         }
//         bcrypt.compare(req.body.password, user.password, (err, result) =>{
//             if(err) {
//                 return badRequestResponse(res, "Server error")
//             }
//             if(result) {
//                 const token = jwt.sign({
//                     email: user.email,
//                     userId: user._id
//                 }, process.env.JWT_KEY,{
//                     expiresIn: "1h"
//                 })
//                 return res.status(200).json({
//                     message: "Auth Success",
//                     token: token
//                 })
//             }
//             unauthorizedResponse(res, "Acess denied")
//         })
//     })
//     .catch(err =>{
//         console.log(err)
//         serverErrorResponse(res, "Server error")
//     })