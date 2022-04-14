const express = require("express")

const router = express.Router()
const checkAuth = require("../middleware/auth")

const userTransaction = require("../controllers/transaction")

//Routes
router.get("/",  userTransaction.showTransaction)

router.post("/add",  userTransaction.addTransaction)

router.post("/delete",  userTransaction.deleteTransaction)

module.exports = router