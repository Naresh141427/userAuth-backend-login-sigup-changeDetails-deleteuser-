const express = require("express")
const router = express.Router()

const { login, signup, updateUserDeatils, deleteUser, getUsers, getSpecificUser } = require("../controllers/user.controller")


router.post("/login", login)

router.post("/signup", signup)

router.post("/user/:id", updateUserDeatils)

router.get("/users", getUsers)

router.get("/user/:id", getSpecificUser)


router.delete("/user/:id", deleteUser)
module.exports = router