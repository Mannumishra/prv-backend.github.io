const Size = require("../Model/SizeModel")


const createRecord = async (req, res) => {
    try {
        const { maincategory, sizename } = req.body
        if (!maincategory || !sizename) {
            return res.status(402).json({
                success: false,
                msg: "Please Fill"
            })
        }
        const SaveDataCate = new Size({
            maincategory, sizename
        })
        // console.log(SaveDataCate)
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

const getRecord = async (req, res) => {
    try {
        let data = await Size.find()
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
    }
}


const getSingleRecord = async (req, res) => {
    try {
        let data = await Size.findOne({_id:req.params._id})
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
    }
}

const updateRecord = async (req, res) => {
    try {
        let data = await Size.findOne({_id:req.params._id})
        if(data){
            console.log(data ,"before");
            data.maincategory=req.body.maincategory??data.maincategory
            data.sizename=req.body.sizename??data.sizename
            console.log(data ,"after");
            await data.save()
        }
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
    }
}


const deleteRecord = async (req, res) => {
    try {
        let data = await Size.findOne({_id:req.params._id})
        await data.deleteOne()
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord:getRecord,
    deleteRecord:deleteRecord,
    getSingleRecord:getSingleRecord,
    updateRecord:updateRecord
}