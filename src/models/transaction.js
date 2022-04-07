const mongoose = require("mongoose")
const {TRANSACTION_TYPE} = require("../utils/enums")
const transactionSchema = new mongoose.Schema({
    type:{
        type: String,
        enum: Object.values(TRANSACTION_TYPE),
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' 
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
})

const Transaction = mongoose.model("transaction", transactionSchema)

module.exports = Transaction

