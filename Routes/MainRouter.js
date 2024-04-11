const ContactRouter = require("./ContactRouter")
const OrderRouter = require("./OrderRouter")
const ProductRouter = require("./ProductRouter")
const UserRouter = require("./UserRouter")

const Router = require("express").Router()

Router.use("/product" ,ProductRouter)
Router.use("/user" ,UserRouter)
Router.use("/contact" , ContactRouter)
Router.use("/order" , OrderRouter)

module.exports = Router