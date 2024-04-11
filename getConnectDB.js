const mongoose = require("mongoose")

const getConnect = async() => {
   await mongoose.connect("mongodb://localhost:27017/shose")
    console.log("Database Is Connected SuccessFully");
}
getConnect()