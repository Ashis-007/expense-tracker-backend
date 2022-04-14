const mongoose = require("mongoose")

const {successResponse,createdSuccessResponse,
    notFoundResponse,unauthorizedResponse,
    badRequestResponse,forbiddenResponse,
serverErrorResponse,googleAccessDeniedResponse,
unprocessableEntityResponse} = require("../utils/response")
const Transaction = require("../models/index")

const TransactionRepository = require("../repository/transaction.repository")

exports.showTransaction = async (req, res) =>{
    try {
        const transactions = await TransactionRepository.getAllTransaction()   //<<-----------------------Resolve This
        return successResponse(res, "All transactions fetched", {
            count : transactions.length,
            data: transactions
        })
    }catch (err){
        return serverErrorResponse(res, "Server Error")
    }
}


exports.addTransaction = async (req, res) =>{
    try{
    const {type, amount, account, category} = req.body
    const transaction = TransactionRepository.createTransaction({
        type: type,
        amount: amount,
        account: account,
        category: category
    })
    await transaction.save()
    return createdSuccessResponse(res, "Added amount successfully")
    }catch(err) {
        return serverErrorResponse(res, "An error occurred")
    }
    
}


exports.deleteTransaction = async (req, res) =>{
    try{
        const transaction = await TransactionRepository.deleteTransaction(req.body)

        if(!transaction) {
            return notFoundResponse(res, "No transactions found")
        }
        await transaction.remove()
        return successResponse(res, "Removed transaction")
    }catch(err){
        return serverErrorResponse(res, "Error occurred")
    }
}