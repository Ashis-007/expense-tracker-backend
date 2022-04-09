require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { MONGO_LINK } = require("./utils/config");

mongoose.connect(MONGO_LINK, { UseNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  console.log("CONNECTED TO DB");
});

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker backend up and runnin");
});

console.log(process.env.NODE_ENV);
console.log(process.env.MONGO_LINK);

module.exports = app;

