const { createRecord } = require("../Controllar/OrderControllar")

const OrderRouter = require("express").Router()

OrderRouter.post("/" , createRecord)

module.exports = OrderRouter