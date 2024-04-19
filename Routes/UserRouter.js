const { newRegister, login, getByUserId } = require("../Controllar/UserControllar")
const { verifyAdmin } = require("../verification")

const UserRouter = require("express").Router()

UserRouter.post("/",verifyAdmin, newRegister)
UserRouter.post("/login", login)
UserRouter.get("/:_id" ,getByUserId)

module.exports = UserRouter