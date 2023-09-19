const mongoose = require('mongoose')
const { Schema } = mongoose;
const message = new Schema({
    username: { type: String, required: true },
    phoneNumber:{type:String,required:true},
    email:{type:String,required:true},
    subject:{type:String,required:true},
    message:{type:String,required:true},


}, {
    timestamps: true
})
const messages = mongoose.model("message",message)
module.exports = messages