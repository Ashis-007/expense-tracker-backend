require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` })
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const mongoUri = process.env.MONGO_LINK

mongoose.connect(mongoUri, {UseNewUrlParser: true})

app.use(morgan("dev"))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Expense Tracker backend up and runnin")
})

console.log(process.env.NODE_ENV)
console.log(process.env.MONGO_LINK)

module.exports = app