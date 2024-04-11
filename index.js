const express = require("express")
const Router = require("./Routes/MainRouter")
const cors = require("cors")
require("./getConnectDB")
require("dotenv").config()
const PORT = 8000
const app = express()

const Options = {
    origin:["http://localhost:3000"]
}
app.use(express.json())
app.use(cors(Options))
app.use(express.urlencoded({ extended: true }))
app.set(express.static("./Public"))
app.use("/Public" , express.static("Public"))
app.use('/api', Router)

app.listen(PORT, () => {
    console.log(`Server Is Running at ${PORT}`);
})