const express = require("express")

const router = express.Router()
const checkAuth = require("../middleware/auth")

const userTransaction = require("../controllers/transaction")


router.get("/", checkAuth, userTransaction.showTransaction)

router.post("/add", checkAuth, userTransaction.addTransaction)

router.post()