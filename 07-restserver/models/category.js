const { Schema, model} = require("mongoose")

const CategorySchema = new Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

CategorySchema.methods.toJSON = function () {
    const {__v, _id, state, ...category} = this.toObject()
    category.cid = _id
    return category
}

module.exports = model( "Category", CategorySchema)