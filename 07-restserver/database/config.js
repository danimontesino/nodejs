const mongoose = require("mongoose")

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN)

        console.log("Successful database connection")
    } catch (err) {
        console.log(err)
        throw new Error("Error starting the database")
    }
}

module.exports = {
    dbConnection
}