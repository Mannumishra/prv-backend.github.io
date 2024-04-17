const { createRecord, getRecord, updateRecord, deleteRecord, getSingleRecord } = require("../Controllar/SubcategoryControllar")

const SubcategoryRouter = require("express").Router()

SubcategoryRouter.post("/", createRecord)
SubcategoryRouter.get("/", getRecord)
SubcategoryRouter.put("/:_id", updateRecord)
SubcategoryRouter.delete("/:_id", deleteRecord)
SubcategoryRouter.get("/:_id", getSingleRecord)


module.exports = SubcategoryRouter