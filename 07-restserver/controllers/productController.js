const {response, request} = require('express')
const {Product, Category} = require("../models");

const productsGet = async (req = request, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const filter = {state : true}

    try {
        const [total, products] = await Promise.all([
            Product.countDocuments(filter),
            Product.find(filter)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(Number(from))
                .limit(Number(limit))
        ])

        res.json({
            total,
            products
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: 'Contact the administrator - Products Get'
        })
    }
}

const productGet = async (req = request, res = response) => {
    const id = req.params.id
    const product = await Product.findOne({id, state: true}).populate('user', 'name').populate('category', 'name')

    if ( !product ){
        return res.status(400).json({
            msg: "There is no product with this id",
            id
        })
    }

    res.json({
        msg: "product successfully found",
        product
    })
}

const productCreate = async (req = request, res = response) => {
    const {name, description, img, category_slug} = req.body
    const slug = req.body.slug.toLowerCase()
    const category = await Category.findOne({slug: category_slug})

    // We check if a product exists
    let product = await Product.findOne({slug})

    if( product){
        return res.status(400).json({
            msg: "There is already a product with this slug"
        })
    }

    const data = {
        name,
        slug,
        img,
        description,
        user: req.auth_user._id,
        category: category._id
    }

    try {
        product = new Product( data )
        await product.save()

        res.status(201).json({
            msg: "Create product",
            product
        })
    } catch (err) {
        console.log(err)
        res.status(500).json( {
            msg: "Error saving product, consult administrator"
        })
    }
}

const productUpdate = async (req = request, res = response) => {
    const id = req.params.id
    const {_id, state,...reqProduct} = req.body

    try {
        const product = await Product.findByIdAndUpdate(id, reqProduct)
        res.json({
            msg: "product successfully update",
            product
        })
    } catch (err) {
        console.log(err)
        res.status(409).json({
            msg: `Error updating product - ${err.codeName}`
        })
    }
}

const productDelete = async (req = request, res = response) => {
    const id = req.params.id
    const product = await Product.findByIdAndUpdate(id, {state: false}).populate('user', 'name').populate('category', 'name')

    res.json({
        msg: "product successfully delete",
        product
    })
}

module.exports = {
    productsGet,
    productGet,
    productCreate,
    productUpdate,
    productDelete
}