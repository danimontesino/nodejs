const {response, request} = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const userGet = async (req = request, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const filter = {state : true}

    const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    })
}

const userUpdate = async (req, res) => {
    const id = req.params.id
    const {_id, password, google, email, state,...reqUser} = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync()
        reqUser.password = bcryptjs.hashSync( password, salt)
    }

    const user = await User.findByIdAndUpdate(id, reqUser)

    res.json({
        msg: "User successfully update",
        user
    })
}

const userCreate = async (req, res) => {
    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync( password, salt)

    await user.save()

    res.json({
        msg: "User successfully created",
        user
    })
}

const userDelete = async (req, res) => {
    const id = req.params.id

    // Physical deletion | Not recommended
    // const user = await User.findByIdAndDelete(id)

    const user = await User.findByIdAndUpdate(id, {state: false})

    res.json({
        msg: "User successfully delete",
        user
    })
}

module.exports = {
    userGet,
    userUpdate,
    userCreate,
    userDelete
}