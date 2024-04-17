const Order = require("../Model/OrderModel")
const User = require("../Model/UserModel")

exports.createRecord = async (req, res) => {
    try {
        const { userid, cartItems } = req.body
        console.log("i am hittttt");
        // console.log(req.body,"order")
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
        // Fetch orders and populate the userid field with user details
        let orders = await Order.find().populate('userid');

        let combinedData = [];

        // Loop through each order
        for (let order of orders) {
            // Find user details for the order
            let user = await User.findById(order.userid);

            if (user) {
                // Combine order details with user details
                let combinedOrder = {
                    orderId: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    user: {
                        userId: user._id,
                        username: user.name,
                        phone:user.phone,
                        email: user.email
                        // Include other user details as needed
                    }
                };

                // Push combined order details to the array
                combinedData.push(combinedOrder);
            }
        }

        // Send the response with the combined data
        res.status(200).json({
            success: true,
            data: combinedData
        });
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};