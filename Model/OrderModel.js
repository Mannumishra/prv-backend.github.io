const mongoose = require("mongoose")

const productmini = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is Must required"]
    },
    size: {
        type: String,
        required: [true, "Product id is must Required"]
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is must Required"]
    }
    ,
    color: {
        type: String,
        required: [true, "Product Category is must Required"]
    }, image: {
        type: String

    },
    category: {
        type: String,
        required: [true, "Product Color is Must Required"]
    },
    subcategory: {
        type: String,
        required: [true, "Product Subcategory Must Required"]
    }
})
const orderSchema = new mongoose.Schema({
    userid: {

        type: String,
        required: [true, "User Id is must required"]
    },
    date:{
        type:String,
        default:Date.now()
    },
    product: [productmini]

})

const Order = mongoose.model("Order", orderSchema)


module.exports = Order