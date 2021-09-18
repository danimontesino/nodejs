const {response} = require('express')
const {User, Category, Product, Role} = require("../models");
const {ObjectId} = require('mongoose').Types

const allowedCollections = [
    'user',
    'category',
    'product',
    'role'
]

const searchUser = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term)

    if ( isMongoID ) {
        const user = await User.findById(term)
        return res.json({
            results: ( user ) ? [ user ] : []
        })
    }

    const regex = new RegExp( term, 'i' )

    const users = await User.find( {
        $or : [{name: regex}, {email: regex}],
        $and : [{state: true}]
    })

    res.json({
        results: users
    })
}

const searchCategory = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term)

    if ( isMongoID ) {
        const category = await Category.findById(term)
        return res.json({
            results: ( category ) ? [ category ] : []
        })
    }

    const regex = new RegExp( term, 'i' )

    const categories = await Category.find( {
        $or : [{name: regex}, {slug: regex}],
        $and : [{state: true}]
    })

    res.json({
        results: categories
    })
}

const searchProduct = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term)

    if ( isMongoID ) {
        const product = await Product.findById(term)
        return res.json({
            results: ( product ) ? [ product ] : []
        })
    }

    const regex = new RegExp( term, 'i' )

    const products = await Product.find( {
        $or : [{name: regex}, {slug: regex}],
        $and : [{state: true}]
    })

    res.json({
        results: products
    })
}

const searchRole = async (term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term)

    let users = []

    if ( isMongoID ) {
        const objRole = await Role.findById(term)
        users = await User.find({ role : objRole.role, state: true })
        return res.json({
            results: ( users ) ? [ users ] : []
        })
    }


    const strRole = term.toUpperCase()

    users = await User.find( {
        role : strRole,
        state: true
    })

    res.json({
        results: users
    })
}

const search = async (req, res = response) => {
    const {collection, term} = req.params

    if( !allowedCollections.includes( collection ) ){
        return res.status(400).json({
            msg: `Allowed collections are ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'user' :
               await searchUser(term, res)
            break;
        case 'category' :
                await searchCategory(term, res)
            break;
        case 'product' :
                await searchProduct(term, res)
            break;
        case 'role' :
                await searchRole(term, res)
            break;

        default:
            res.status(500).json({
                msg: "The search does not work, contact the administrator"
            })
    }
}

module.exports = {
    search
}