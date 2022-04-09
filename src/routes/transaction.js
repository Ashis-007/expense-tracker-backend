const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const checkAuth = require("../middleware/auth")

const Transaction = require("../models/index")


router.get("/", (req, res) =>{

})

router.post("/", (req, res) =>{
    const {type, amount, account, category} = req.body
    const transaction = new Transaction({
        type: type,
        amount: amount,
        account: account,
        category: category
    })
    transaction.save()
    .then(result =>{
        res.status(201).json({
            message: "Successfully added amount"
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})