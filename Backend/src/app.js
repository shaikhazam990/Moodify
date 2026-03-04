const express = require("express")
const cookieparser = require("cookie-parser")
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// require routes
const authRouter = require("./routes/auth.route")
const songRouter = require("./routes/song.route")

// api routes
app.use("/api/auth", authRouter)
app.use("/api/songs", songRouter)

module.exports=app

