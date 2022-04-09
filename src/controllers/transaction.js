const mongoose = require("mongoose")

const response = require("../utils/response")
const Transaction = require("../models/index")


exports.showTransaction = (req, res) =>{

}

exports.addTransaction = (req, res) =>{
    const {type, amount, account, category} = req.body
    const transaction = new Transaction({
        type: type,
        amount: amount,
        account: account,
        category: category
    })
    transaction.save()
    .then(result =>{
        response.createdSuccessResponse(res, "Successfully added amount")
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}