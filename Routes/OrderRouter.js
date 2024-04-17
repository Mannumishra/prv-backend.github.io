const { createRecord, getRecord } = require("../Controllar/OrderControllar")
const { verifyBuyer } = require("../verification")

const OrderRouter = require("express").Router()

OrderRouter.post("/", createRecord)
OrderRouter.get("/", getRecord)

module.exports = OrderRouter