const { createRecord } = require("../Controllar/ContactControllar")
// const { verifyBuyer } = require("../verification")

const ContactRouter = require("express").Router()


ContactRouter.post("/", createRecord)

module.exports = ContactRouter