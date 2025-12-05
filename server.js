
const express = require("express")
const { testConnection } = require("./db")

const router = require("./routes/user.routes")

const app = express()

app.use(express.json())

app.get("/", (req, res) => res.send("App is running"))

app.use("/api/auth", router)

const PORT = 5000
app.listen(PORT,
    async () => {
        await testConnection()
        console.log(`Server started running at http://localhost:${PORT}`)
    })

