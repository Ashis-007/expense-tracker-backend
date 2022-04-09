const path = require("path")
require('dotenv').config({ path: path.join(__dirname, '../.env.development') })
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const {MONGO_LINK} = require("./utils/config")


mongoose.connect(MONGO_LINK,{UseNewUrlParser: true}, (err) => {
  if(err) console.log(err)
  console.log("CONNECTED TO DB")
})

app.use(morgan("dev"))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Expense Tracker backend up and runnin")
})




module.exports = app
