const {response, request} = require('express')
const {Category} = require("../models");

const categoriesGet = async (req = request, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const filter = {state : true}

    const [total, categories] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        categories
    })
}

const categoryGet = async (req = request, res = response) => {
    const id = req.params.id
    const category = await Category.findOne({id, state: true}).populate('user', 'name')

    if ( !category ){
        return res.status(400).json({
            msg: "There is no category with this id",
            id
        })
    }

    res.json({
        msg: "Category successfully found",
        category
    })
}

const categoryCreate = async (req = request, res = response) => {
    const {name, description, img} = req.body
    const slug = req.body.slug.toLowerCase()

    // We check if a category exists
    let category = await Category.findOne({slug})

    if( category){
        return res.status(400).json({
            msg: "There is already a category with this slug"
        })
    }

    const data = {
        name,
        slug,
        img,
        description,
        user: req.auth_user._id
    }

    try {
        category = new Category( data )
        await category.save()

        res.status(201).json({
            msg: "Create category",
            category
        })
    } catch (err) {
        console.log(err)
        res.status(500).json( {
            msg: "Error saving, consult administrator"
        })
    }
}

const categoryUpdate = async (req = request, res = response) => {
    const id = req.params.id
    const {_id, state,...reqCategory} = req.body

    try {
        const category = await Category.findByIdAndUpdate(id, reqCategory)
        res.json({
            msg: "Category successfully update",
            category
        })
    } catch (err) {
        console.log(err)
        res.status(409).json({
            msg: `Error updating category - ${err.codeName}`
        })
    }
}

const categoryDelete = async (req = request, res = response) => {
    const id = req.params.id
    const category = await Category.findByIdAndUpdate(id, {state: false}).populate('user', 'name')

    res.json({
        msg: "Category successfully delete",
        category
    })
}

module.exports = {
    categoriesGet,
    categoryGet,
    categoryCreate,
    categoryUpdate,
    categoryDelete
}