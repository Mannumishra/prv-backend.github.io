const { createRecord } = require("../Controllar/ContactControllar")

const ContactRouter = require("express").Router()


ContactRouter.post("/" ,createRecord)

module.exports = ContactRouter