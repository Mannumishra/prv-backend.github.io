const { createRecord, getRecord, deleteRecord, getRecordSingle, updateRecord } = require("../Controllar/ProductControllar")
const multer = require("multer")
const { verifyAdmin } = require("../verification")
const fs = require('fs');
const ProductRouter = require("express").Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = 'Public/Product';
        // Check if the directory exists, create it if it doesn't
        fs.mkdir(destinationPath, { recursive: true }, function(err) {
            if (err) {
                console.error('Error creating directory:', err);
            }
            cb(null, destinationPath); // Continue with the destination path
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // File naming convention
    }
});

const upload = multer({ storage: storage })


ProductRouter.post('/',verifyAdmin,  upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
]), createRecord)

ProductRouter.get("/", getRecord)
ProductRouter.get("/:_id", getRecordSingle)

ProductRouter.delete("/:_id", verifyAdmin, deleteRecord)

ProductRouter.put("/:_id",verifyAdmin,  upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 }
]), updateRecord)

module.exports = ProductRouter