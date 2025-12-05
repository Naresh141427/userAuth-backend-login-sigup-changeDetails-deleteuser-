
const bcrypt = require("bcrypt")

const { getuserByEmailId, createUser, getuserById, updateUserDetailsById } = require("../models/user.model")
const { generateToken } = require("../utils/jwt")
const { pool } = require("../db")


const login = async (req, res) => {
    const { email, password } = req.body



    try {

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await getuserByEmailId(email)


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)


        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = { id: user.id, name: user.first_name, email: user.email }

        const token = await generateToken(payload)

        const { password: hashedPassword, ...safeUser } = user;


        res.status(200).json({
            success: true,
            message: "user fetched successfully",
            token,
            user: safeUser
        })

    } catch (err) {
        console.error("login error", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}


const signup = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword, phoneNumber } = req.body

    try {

        if (!firstname || !lastname || !email || !password || !confirmPassword || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password do not matched. please try again"
            })
        }

        const checkUser = await getuserByEmailId(email)

        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists with the email"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const usesrId = await createUser(firstname, lastname, email, hashPassword, phoneNumber)

        return res.status(200).json({
            success: true,
            message: "user created successfully",
            usesrId
        })

    } catch (err) {
        console.error("signup error", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}


const updateUserDeatils = async (req, res) => {

    try {
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: "No user id provided"
            })
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No details found to update"
            })
        }

        const { id } = req.params
        const checkUser = await getuserById(id)

        if (!checkUser) {
            return res.status(401).json({
                succcess: false,
                message: "User not found"
            })
        }

        const columnNames = []
        const values = []
        for (const [key, value] of Object.entries(req.body)) {

            if (key === "firstName") {
                columnNames.push("first_name = ?")
                values.push(value)
            }

            if (key === "lastName") {
                columnNames.push("last_name = ?")
                values.push(value)
            }

            if (key === "email") {
                columnNames.push("email = ?")
                values.push(value)
            }

            if (key === "phoneNumber") {
                columnNames.push("phone_number = ?")
                values.push(value)
            }

            if (key === "password") {
                columnNames.push("password = ?")
                const encryptPassword = await bcrypt.hash(value, 10)
                values.push(encryptPassword)
            }
        }

        if (columnNames.length === 0) {
            return res.status(400).json({ message: "No valid fields provided" });
        }

        const result = await updateUserDetailsById(id, columnNames, values)

        if (!result) {
            return res.status(500).json({
                succcess: false,
                message: "Internal server error"
            })
        }

        return res.status(200).json({
            succcess: true,
            message: "user details updated successfully"
        })


    } catch (err) {
        console.error("signup error", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}
module.exports = { login, signup, updateUserDeatils }