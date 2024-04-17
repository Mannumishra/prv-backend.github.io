const Category = require("../Model/Category");

const createRecord = async (req, res) => {
    try {
        let data = new Category(req.body);
        await data.save();
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const updateRecord = async (req, res) => {
    try {
        let data = await Category.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }
        data.maincategory = req.body.maincategory ?? data.maincategory;
        await data.save();
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const getRecord = async (req, res) => {
    try {
        let data = await Category.find();
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const getSingleRecord = async (req, res) => {
    try {
        let data = await Category.findOne({_id:req.params._id});
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

const deleteRecord = async (req, res) => {
    try {
        let data = await Category.findOne({_id:req.params._id});
        await data.deleteOne()
        res.status(200).json({
            success: true,
            mess:"Record Deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};

module.exports = {
    createRecord: createRecord,
    updateRecord: updateRecord,
    getRecord: getRecord,
    deleteRecord:deleteRecord,
    getSingleRecord:getSingleRecord
};
