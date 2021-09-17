const {validationResult} = require("express-validator");
const {response} = require("express");

const validateFields = (req, res, next) => {
    const errors = validationResult(req)
    if( !errors.isEmpty() ){
        return res.status(400).json(errors)
    }

    next()
}

const validateSlug = (req, res = response, next) => {
    const { slug } = req.body;

    if( /\s/.test(slug)){
        return res.status(400).json({
            msg: `Format error - ${slug} is not a valid slug!`
        })
    }

    next()
}

module.exports = {
    validateFields,
    validateSlug
}