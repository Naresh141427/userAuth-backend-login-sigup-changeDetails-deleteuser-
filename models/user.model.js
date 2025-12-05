const { pool } = require("../db")



const createUser = async (firstname, lastname, email, password, phoneNumber) => {
    try {

        const [result] = await pool.query(`
            INSERT INTO users(first_name, last_name,email,password,phone_number)
            VALUES(?, ?, ?, ?, ?)
        
        `,
            [firstname, lastname, email, password, phoneNumber]
        )

        return result.insertId

    } catch (err) {
        console.error("DB error:", err.message);
        throw err
    }
}
const getAllUsers = async () => {
    try {

        const [rows] = await pool.query("SELECT id,first_name,last_name,email,phone_number FROM users")
        return rows

    } catch (err) {
        console.error("DB error:", err.message);
        throw err
    }
}

const getuserByEmailId = async (email) => {
    try {

        const [rows] = await pool.query("SELECT id,first_name,last_name,email,password,phone_number FROM users WHERE email = ? ", [email])
        return rows[0]

    } catch (err) {
        console.error("DB error:", err.message);
        throw err
    }
}
const getuserById = async (id) => {
    try {

        const [rows] = await pool.query("SELECT first_name,last_name,email FROM users WHERE id = ?", [id])
        return rows[0]

    } catch (err) {
        console.error("DB error:", err.message);
        throw err
    }
}



const updateUserDetailsById = async (id, columns, values) => {

    try {
        const sql = `
            UPDATE users
            SET ${columns.join(", ")}
            WHERE id = ?
        `;

        const [result] = await pool.execute(sql, [...values, id]);

        return result.affectedRows;

    } catch (err) {
        console.error("DB error:", err.message);
        throw err;
    }
}

const deleteUserById = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
        return result.affectedRows;
    } catch (err) {
        console.error("DB error:", err.message);
        throw err;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getuserByEmailId,
    getuserById,
    updateUserDetailsById,
    deleteUserById
}