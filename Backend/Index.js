const express = require('express')
const cores = require('cors')
const app=express();
app.use(cores())
app.listen(8000,()=>{
    console.log("server is running");
})