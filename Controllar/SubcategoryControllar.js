const Subcategory = require("../Model/SubcategoryModel")

const createRecord = async (req, res) => {
    try {
        const { maincategory, subcategory } = req.body
        if (!maincategory || !subcategory) {
            return res.status(402).json({
                success: false,
                msg: "Please Fill"
            })
        }
        const SaveDataCate = new Subcategory({
            maincategory, subcategory
        })
        console.log(SaveDataCate)
        const data = await SaveDataCate.save()
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
        let data = await Subcategory.findOne({ _id: req.params._id });
        if (!data) {
            return res.status(404).json({
                success: false,
                error: 'Subcategory not found'
            });
        }
        data.maincategory = req.body.maincategory ?? data.maincategory;
        data.subcategory = req.body.subcategory ?? data.subcategory;
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
        let data = await Subcategory.find();
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
        let data = await Subcategory.findOne({ _id: req.params._id });
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
        let data = await Subcategory.findOne({ _id: req.params._id });
        await data.deleteOne()
        res.status(200).json({
            success: true,
            mess: "Record Deleted"
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
    deleteRecord: deleteRecord,
    getSingleRecord: getSingleRecord
};
