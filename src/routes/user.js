const express = require("express");
const router = express.Router();

const UserControl = require("../controllers/user");
const checkAuth = require("../middleware/auth");

router.post("/signup", UserControl.user_signup);

router.post("/login", UserControl.user_login);

router.delete("/:email", checkAuth, UserControl.user_delete);

module.exports = router;
