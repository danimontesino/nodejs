const express = require('express')

class Server{
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        // Middlewares
        this.middlewares()
        // Routes
        this.routes()
    }

    middlewares(){
        // Dir public
        this.app.use(express.static("public"))
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.send('Hello World')
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;