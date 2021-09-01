const express = require('express')
const cors = require('cors')
const {dbConnection} = require("../database/config");

class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'
        // Connect database
        this.connectDB()
        // Middlewares
        this.middlewares()
        // Routes
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares(){
        // CORS
        this.app.use(cors({
            origin: "http://localhost:8080/",
            optionsSuccessStatus: 200
        }))

        // Read and Parse body
        this.app.use( express.json() )

        // Dir public
        this.app.use(express.static("public"))
    }

    routes(){
        this.app.use(this.authPath, require('../routes/authRoute'))
        this.app.use(this.usersPath, require('../routes/userRoute'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`CORS-enabled web server listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;