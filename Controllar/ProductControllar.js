const Product = require("../Model/ProductModel")
const fs = require("fs")
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dglihfwse',
    api_key: '939345957566958',
    api_secret: 'q-Pg0dyWquxjatuRb62-PtFzkM0'
});
const uploadCloundanary = async (file) => {
    try {
        const uploadFile = await cloudinary.uploader.upload(file)
        return uploadFile.secure_url
    } catch (error) {
        console.log(error)
    }
}
exports.createRecord = async (req, res) => {
    try {
        let data = new Product(req.body)
        // console.log(req.body);
        if (req.files.pic1) {
            const url = await uploadCloundanary(req.files.pic1[0].path)
            data.pic1 = url
        }
        if (req.files.pic2) {
            const url = await uploadCloundanary(req.files.pic2[0].path)
            data.pic2 = url
        }
        if (req.files.pic3) {
            const url = await uploadCloundanary(req.files.pic3[0].path)
            data.pic3 = url
        }
        if (req.files.pic4) {
            const url = await uploadCloundanary(req.files.pic4[0].path)
            data.pic4 = url
        }
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
        console.log(data);
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
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.sizename = req.body.sizename ?? data.sizename
            data.stock = req.body.stock ?? data.stock
            if (req.files) {
                if (req.files.pic1) {
                    console.log(req.files.pic1, req.file.pic1);
                    try {
                        fs.unlinkSync(data.pic1)
                    } catch (error) { }
                    const url = await uploadCloundanary(req.files.pic1[0].path)
                    data.pic1 = url
                }
                if (req.files.pic2) {
                    try {
                        fs.unlinkSync(data.pic2)
                    } catch (error) { }
                    const url = await uploadCloundanary(req.files.pic2[0].path)
                    data.pic2 = url
                }
                if (req.files.pic3) {
                    try {
                        fs.unlinkSync(data.pic3)
                    } catch (error) { }
                    const url = await uploadCloundanary(req.files.pic3[0].path)
                    data.pic3 = url
                }
                if (req.files.pic4) {
                    try {
                        fs.unlinkSync(data.pic4)
                    } catch (error) { }
                    const url = await uploadCloundanary(req.files.pic4[0].path)
                    data.pic4 = url
                }
            }
            await data.save()
            res.status(200).json({
                success: true,
                res: "Record Updated",
                data: data
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
                console.log(data.pic1);
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