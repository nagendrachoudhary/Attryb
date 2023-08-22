const express = require('express')
const cores = require('cors');
const database = require('./db/Connection');
const  router  = require('./Routes/Route');
const cookieParser = require('cookie-parser')
const app=express();
app.use(cookieParser());
app.use(cores())
app.use(express.json())
app.use('/',router)
app.listen(8080,()=>{
    database()
    console.log("server is running");
})