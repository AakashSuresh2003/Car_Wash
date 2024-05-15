const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors");
const ConnectDB = require("./src/DB/dataBase");
const authRouter = require('./src/router/auth')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser())

app.use("/api/v1/auth",authRouter)

ConnectDB()

const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`);
})