require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes/routes')
mongoose.connect('mongodb://localhost/muzieeek',{useNewUrlParser:true})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)









app.listen(port,()=>{
    console.log(port)
})

