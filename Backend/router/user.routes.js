const express = require('express')
const router = express.Router()

router.get('/login',(req,res)=>{
    res.send("login")
})
router.get('/register',(req,res)=>{
    res.send("regigigax")
})
router.get('/logout',(req,res)=>{
    res.send("lugia")
})

module.exports = router