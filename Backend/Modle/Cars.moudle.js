const mongoose = require('mongoose')
const { Schema } = mongoose;
const Car = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
    user: { type: String, required: true },
    description:{ type: String, required: true }
}, {
    timestamps: true
})
const cardata = mongoose.model("car", Car)
module.exports = cardata