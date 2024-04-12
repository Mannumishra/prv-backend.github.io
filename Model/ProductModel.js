const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is must Required"]
    },
    brand: {
        type: String,
        required: [true, "Product Brand is Must Required"]
    },
    maincategory: {
        type: String,
        required: [true, "Product Color is Must Required"]
    },
    color: {
        type: String,
        required: [true, "Product Color is Must Required"]
    },
    size: {
        type: Number
    },
    stock: {
        type: Number,
        required: [true, "Stock is must Required"]
    },
   pic1: {
        type: String
        // ,
        // required: [true, "Product Pic is must Required"]
    },
   pic2: {
        type: String
        // ,
        // required: [true, "Product Pic is must Required"]
    },
   pic3: {
        type: String
        // ,
        // required: [true, "Product Pic is must Required"]
    },
   pic4: {
        type: String
        // ,
        // required: [true, "Product Pic is must Required"]
    },
    active: {
        type: Boolean,
        default: true
    }
})


const Product = mongoose.model("Product", ProductSchema)

module.exports = Product