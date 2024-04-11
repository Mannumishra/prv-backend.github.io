const Order = require("../Model/OrderModel")

exports.createRecord = async (req, res) => {
    try {
        const { userid, product } = req.body
        if (!userid || !product) {
            res.status(400).json({
                success: false,
                message: "All field is Required"
            })
        }
        const data = new Order({ userid, product })
        await data.save()
        res.status(200).json({
            success: true,
            message: "Record is created",
            data: data
        })
    } catch (error) {
        console.log(error);
    }
}