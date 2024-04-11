const mongoose = require("mongoose")

const productmini = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is Must required"]
    },
    productid: {
        type: String,
        required: [true, "Product id is must Required"]
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is must Required"]
    },
    category: {
        type: String,
        required: [true, "Product Category is must Required"]
    }
})
const orderSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "User Id is must required"]
    },
    product: [productmini]

})

const Order = mongoose.model("Order", orderSchema)


module.exports = Order