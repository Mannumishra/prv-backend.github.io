const { createRecord, getRecord, confirmOrder } = require("../Controllar/OrderControllar")
// const { verifyBuyer } = require("../verification")

const OrderRouter = require("express").Router()

OrderRouter.post("/", createRecord)
OrderRouter.get("/", getRecord)
OrderRouter.post("/confirm",confirmOrder)

module.exports = OrderRouter