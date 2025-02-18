const mongoose = require('mongoose')
const dotenv = require('dotenv')
const getConnection = ()=>{
    const con = mongoose.connect(process.env.MONGO_URI)
    .then((err)=>{
        if(err){
            console.log(err.toString())
        }
        console.log("db connected")
    })
}

module.exports = getConnection