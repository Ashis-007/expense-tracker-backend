const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.development") });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { MONGO_LINK } = require("./utils/config");

const userRoutes = require("./routes/user")
const transactionRoutes = require("./routes/transaction")


mongoose.connect(MONGO_LINK, { UseNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  console.log("CONNECTED TO DB");
});

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes)
app.use("/transaction", transactionRoutes)


app.get("/", (_, res) => {
  res.send("Expense Tracker backend up and runnin");
});


module.exports = app;
