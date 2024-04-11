const Product = require("../Model/ProductModel")
const fs = require("fs")
const cloudinary = require('cloudinary').v2 
cloudinary.config({ 
  cloud_name: 'dglihfwse', 
  api_key: '939345957566958', 
  api_secret: 'q-Pg0dyWquxjatuRb62-PtFzkM0' 
});
const uploadCloundanary = async(file)=>{
    console.log(file)
    try {
        const uploadFile = await cloudinary.uploader.upload(file)
        return uploadFile.secure_url
    } catch (error) {
        console.log(error)
    }
}
exports.createRecord = async (req, res) => {
    try {
        console.log("I am Hit")
        //   console.log(req.files)
        let data = new Product(req.body)
        if (req.files.pic1){

            const url = await uploadCloundanary(req.files.pic1[0].path)
        console.log("urls",url)
        data.pic1 = url
        }
        if (req.files.pic2){

            data.pic2 = await uploadCloundanary(req.files.pic2[0].path)
        }
        // if (req.files.pic3)
        //     data.pic3 = await uploadCloundanary(req.files.pic3[0].path)
        // if (req.files.pic4)
        //     data.pic4 = await uploadCloundanary(req.files.pic4[0].path)
        await data.save()
        res.send({ status: 200, result: "Done", message: "New Record id Created", data: data })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
}

exports.getRecordSingle = async (req, res) => {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}
exports.updateRecord = async (req, res) => {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.brand = req.body.brand ?? data.brand
            data.color = req.body.color ?? data.color
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.size = req.body.size ?? data.size
            data.stock = req.body.stock ?? data.stock
            if (req.files.pic1) {
                try {
                    fs.unlinkSync(data.pic1)
                } catch (error) { }
                data.pic1 = req.files.pic1[0].path
            }
            if (req.files.pic2) {
                try {
                    fs.unlinkSync(data.pic2)
                } catch (error) { }
                data.pic2 = req.files.pic2[0].path
            }
            if (req.files.pic3) {
                try {
                    fs.unlinkSync(data.pic3)
                } catch (error) { }
                data.pic3 = req.files.pic3[0].path
            }
            if (req.files.pic4) {
                try {
                    fs.unlinkSync(data.pic4)
                } catch (error) { }
                data.pic4 = req.files.pic4[0].path
            }
            await data.save()
            res.status(200).json({
                success: true,
                res: "Record Updated",
                data:data
            })
        }
    } catch (error) {
        console.log(error);
    }
}


exports.getRecord = async (req, res) => {
    try {
        let data = await Product.find()
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

exports.deleteRecord = async (req, res) => {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.pic1)
            } catch (error) { }
            try {
                fs.unlinkSync(data.pic2)
            } catch (error) { }
            try {
                fs.unlinkSync(data.pic3)
            } catch (error) { }
            try {
                fs.unlinkSync(data.pic4)
            } catch (error) { }
            await data.deleteOne()
        }
        res.status(200).json({
            success: true,
            mess: "Record Deleted"
        })
    } catch (error) {
        console.log(error);
    }
}