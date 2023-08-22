const mongoose = require("mongoose")
const database = async()=>{
     await mongoose.connect("mongodb+srv://nagendradangi105:nagendradangi105@cluster0.zftk4am.mongodb.net/?retryWrites=true&w=majority").then(()=>{
        console.log("database connect");
     }).catch((err)=>{
        throw err;
     })
}
module.exports=database;