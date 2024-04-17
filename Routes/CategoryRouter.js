const { createRecord, getRecord, updateRecord, deleteRecord, getSingleRecord } = require("../Controllar/CategoryControllar")

const CategoryRouter  = require("express").Router()

CategoryRouter.post("/" ,createRecord)
CategoryRouter.put("/:_id" ,updateRecord)
CategoryRouter.get("/" ,getRecord)
CategoryRouter.delete("/:_id" ,deleteRecord)
CategoryRouter.get("/:_id" ,getSingleRecord)

module.exports = CategoryRouter