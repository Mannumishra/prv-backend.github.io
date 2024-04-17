const mongoose = require("mongoose")

const Subcategoryschema = new mongoose.Schema({
    subcategory: {
        type: String,
        required: [true, "Category name is must required"]
    }, maincategory: {
        type: String
    }
})

const Subcategory = mongoose.model("Subcategory", Subcategoryschema)

module.exports = Subcategory