const mongoose = require('mongoose')


const connectdb = async() =>{
    try {
        await mongoose.connect(process.env.mongo_link)
        console.log('Database connected Successfully')
    } catch (error) {
        console.log(error)
    }
}

// connectdb()

module.exports = connectdb