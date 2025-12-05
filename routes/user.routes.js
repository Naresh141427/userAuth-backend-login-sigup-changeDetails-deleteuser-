const express = require("express")
const router = express.Router()

const { login, signup, updateUserDeatils } = require("../controllers/user.controller")


router.post("/login", login)

router.post("/signup", signup)

router.post("/user/:id", updateUserDeatils)
module.exports = router