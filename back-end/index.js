const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors");
const ConnectDB = require("./src/DB/dataBase");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

ConnectDB()

const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`);
})