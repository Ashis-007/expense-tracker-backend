const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const Account = mongoose.Model("Account", accountSchema);

module.exports = Account;
