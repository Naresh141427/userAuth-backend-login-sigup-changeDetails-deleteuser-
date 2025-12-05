require("dotenv").config()
const jwt = require("jsonwebtoken")

const generateToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, verifyToken }