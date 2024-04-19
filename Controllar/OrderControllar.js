const Order = require("../Model/OrderModel")
const Product = require("../Model/ProductModel");
const User = require("../Model/UserModel")

exports.createRecord = async (req, res) => {
    try {
        const { userid, cartItems } = req.body
        console.log("i am hittttt" ,userid , cartItems);
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

exports.confirmOrder = async (req, res) => {
    try {
        const { orderid } = req.body;
        const order = await Order.findById(orderid);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        console.log(order)
        const productsToUpdate = order.product;

        for (const productData of productsToUpdate) {
            try {
                const product = await Product.findById(productData._id);
                
                if (!product) {
                    console.log(`Product with ID ${productData._id} not found`);
                    continue;
                }

                const updatedStock = product.stock - productData.quantity;

                if (updatedStock < 0) {
                    console.log(`Insufficient stock for product ${product.name}`);
                    continue;
                }

                product.stock = updatedStock;
                await product.save();
                
                console.log(`Product stock updated for ${product.name}. New stock: ${updatedStock}`);
            } catch (error) {
                console.log(error);
                // Handle error
            }
        }

        res.status(200).json({
            success: true,
            message: "Order confirmed successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};