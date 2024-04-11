const { newRegister, login } = require("../Controllar/UserControllar")

const UserRouter = require("express").Router()

UserRouter.post("/", newRegister)
UserRouter.post("/login", login)

module.exports = UserRouter