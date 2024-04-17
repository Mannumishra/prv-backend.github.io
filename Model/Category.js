const mongoose = require("mongoose")

const categoryschema = new mongoose.Schema({
    maincategory: {
        type: String,
        required: [true, "Category name is must required"]
    }
})

const Category = mongoose.model("category", categoryschema)

module.exports = Category