const express = require("express")
const dotenv = require("dotenv")
const connection = require('./config/dbConfig')
const app = express()
const router = require('./router/user.routes')

dotenv.config() // Getting the secretive files and data
connection() // Setting up the connection

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use('/user',router)

app.listen(process.env.PORT, ()=>{
    console.log(`http://localhost:3000`)
})