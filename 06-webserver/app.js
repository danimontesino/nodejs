const express = require('express')
const app = express()
const hbs = require('hbs');
const port = 8080;

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');

// Serving static content
app.use(express.static("public"))

const options = {
    name: "Daniel",
    title: "NodeJS"
}

app.get('/', (req, res) => {
    res.render('home', options)
})

app.get('/elements', (req, res) => {
    res.render('elements', options)
})

app.get('/generic', (req, res) => {
    res.render('generic', options)
})

/*app.get('/hello-world', (req, res) => {
    res.send('Hello world')
})*/

app.get('*', (req, res) => {
    // res.sendFile(__dirname+"/public/404.html")
    res.send("404 | Not found")
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})