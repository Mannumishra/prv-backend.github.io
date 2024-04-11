const { createRecord, getRecord, deleteRecord, getRecordSingle, updateRecord } = require("../Controllar/ProductControllar")
const multer = require("multer")

const ProductRouter = require("express").Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/Product')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

ProductRouter.post('/', upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 }
    
]), createRecord)

ProductRouter.get("/", getRecord)
ProductRouter.get("/:_id", getRecordSingle)

ProductRouter.delete("/:_id", deleteRecord)

ProductRouter.put("/:_id", upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 }
    // { name: "pic3", maxCount: 1 },
    // { name: "pic4", maxCount: 1 }
]), updateRecord)

module.exports = ProductRouter