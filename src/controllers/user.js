const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = process.env.SALT_ROUNDS
const jwt = require("jsonwebtoken")

const response = require("../utils/response")
const User = require("../models/index")


exports.user_signup = (req, res) =>{
    User.find({email: req.body.email})
    .then(user =>{
        if(user.length > 1){
            return response.badRequestResponse()
        } else{
            bcrypt.hash(req.body.password, saltRounds, (err, hash) =>{
                if(err) {
                    return response.serverErrorResponse()
                } else {
                    const user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                    .then(result =>{
                        response.createdSuccessResponse()
                    })
                    .catch(err =>{
                        console.log(err)
                        response.serverErrorResponse()
                    })
                }
            })
        }
    })
}

exports.user_login = (req, res)=>{
    User.find({email: req.body.email})
    .then(user =>{
        if(user.length < 1){
            return response.unauthorizedResponse()
        }
        bcrypt.compare(req.body.password, user.password, (err, result) =>{
            if(err) {
                return response.badRequestResponse()
            }
            if(result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, process.env.JWT_KEY,{
                    expiresIn: "1h"
                })
                return res.status(200).json({
                    message: "Auth Success",
                    token: token
                })
            }
            response.unauthorizedResponse()
        })
    })
    .catch(err =>{
        console.log(err)
        response.serverErrorResponse()
    })
}

exports.user_delete = (req, res) =>{
    User.remove({email: req.body.email})
    .then(result =>{
        response.successResponse(res, "User deleted successfully")
    }).catch(err =>{
        console.log(err)
        response.serverErrorResponse(res, err.message)
    })
}