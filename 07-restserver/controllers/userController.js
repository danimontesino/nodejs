const {response, request} = require('express')

const userGet = (req = request, res = response) => {
    const {name = "No name", age = 0} = req.query;
    res.json({
        message: "Get Api - controller",
        name,
        age
    })
}

const userUpdate = (req, res) => {
    const id = req.params.id

    res.json({
        message: "Put Api - controller",
        id
    })
}

const userCreate = (req, res) => {
    const body = req.body;

    res.json({
        message: "Post Api - controller",
        body
    })
}

const userDelete = (req, res) => {
    res.json({
        message: "Delete Api - controller"
    })
}

module.exports = {
    userGet,
    userUpdate,
    userCreate,
    userDelete
}