const CategoryRouter = require("./CategoryRouter")
const ContactRouter = require("./ContactRouter")
const OrderRouter = require("./OrderRouter")
const ProductRouter = require("./ProductRouter")
const sizeRouter = require("./SizeRouter")
const SubcategoryRouter = require("./SubcategoryRouter")

const UserRouter = require("./UserRouter")

const Router = require("express").Router()

Router.use("/product", ProductRouter)
Router.use("/user", UserRouter)
Router.use("/contact", ContactRouter)
Router.use("/order", OrderRouter)
Router.use("/category" , CategoryRouter)
Router.use("/subcategory" , SubcategoryRouter)
Router.use("/size" , sizeRouter)

module.exports = Router