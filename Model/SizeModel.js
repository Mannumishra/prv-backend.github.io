const mongoose = require("mongoose")

const  sizeSchema = new mongoose.Schema({
    sizename:{
        type:String,
        required:[true,"Size is must Required"]
    }, maincategory: {
        type: String
    }
})

const Size = mongoose.model("size" , sizeSchema)

module.exports = Size