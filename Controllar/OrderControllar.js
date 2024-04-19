const Order = require("../Model/OrderModel")
const User = require("../Model/UserModel")

exports.createRecord = async (req, res) => {
    try {
        const { userid, cartItems } = req.body
        console.log("i am hittttt");
        if (!userid || !cartItems) {
            return res.status(400).json({
                success: false,
                message: "All field is Required"
            })
        }
        const data = new Order({ userid, product: cartItems })
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
exports.getRecord = async (req, res) => {
    try {
        let orders = await Order.find().populate('userid');

        let combinedData = [];
        for (let order of orders) {
            let user = await User.findById(order.userid);

            if (user) {
                let combinedOrder = {
                    orderId: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    user: {
                        userId: user._id,
                        username: user.name,
                        phone: user.phone,
                        email: user.email
                    }
                };
                combinedData.push(combinedOrder);
            }
        }
        res.status(200).json({
            success: true,
            data: combinedData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};