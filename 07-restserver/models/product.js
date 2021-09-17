const { Schema, model} = require("mongoose")

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    slug: {
        type: String,
        unique: true,
        required: [true, "Slug is required"]
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    img: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

ProductSchema.methods.toJSON = function () {
    const {__v, _id, state, ...Product} = this.toObject()
    Product.pid = _id
    return Product
}

module.exports = model( "Product", ProductSchema)