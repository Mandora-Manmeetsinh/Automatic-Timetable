const express = require("express")
const dotenv = require("dotenv")
const connection = require('./config/dbConfig')
const app = express()

dotenv.config() // Getting the secretive files and data
connection() // Setting up the connection

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(process.env.PORT, ()=>{
    console.log(`http://localhost:3000`)
})