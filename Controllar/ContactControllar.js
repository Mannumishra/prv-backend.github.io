const Contact = require("../Model/ContactModel")

exports.createRecord = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, phone, address, message } = req.body
        if (!name || !email || !phone || !message || !address) {
            return res.status(400).json({
                success: false,
                message: "Please Enter all Required fields"
            })
        }
        const newContact = new Contact({ name, email, phone, message, address })
        await newContact.save()
        res.status(200).json({
            success: true,
            message: "New Record created",
            data: newContact
        })
    } catch (error) {
        console.log(error);
    }
}