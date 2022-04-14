const {Transaction} = require("../models/index")


const getAllTransaction = async (query) =>{
try {
    const transaction = await Transaction.find({account: query})
    return[transaction.toJSON(), null]
}catch(err){
    return [null, err.message]
}
}

const createTransaction = async (data) =>{
try {
    const newTransaction = await Transaction.create(data)
    return [newTransaction, null]
}catch(err) {
    return [null, err.message]
}
}

const deleteTransaction = async(query) =>{
    try{
        const removeTransaction = await Transaction.findOneAndDelete({account: query})
        return [removeTransaction.toJSON(), null]
    }catch(err) {
        return [null, err.message]
    }
}

module.exports = {getAllTransaction, createTransaction, deleteTransaction}