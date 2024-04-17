const { createRecord, getRecord, deleteRecord, getSingleRecord, updateRecord } = require("../Controllar/SizeControllar")

const sizeRouter = require("express").Router()

sizeRouter.post("/" ,createRecord)
sizeRouter.get("/" ,getRecord)
sizeRouter.delete("/:_id" ,deleteRecord)
sizeRouter.put("/:_id" ,updateRecord)
sizeRouter.get("/:_id" ,getSingleRecord)


module.exports = sizeRouter