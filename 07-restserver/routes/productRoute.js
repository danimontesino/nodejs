const {Router} = require('express')
const {check} = require("express-validator");
const {validateJWT, isAdminRole,validateFields, validateSlug} = require("../middlewares");
const {productsGet, productGet, productCreate, productUpdate, productDelete} = require("../controllers/productController");
const {existProductById, existCategoryBySlug} = require("../helpers/dbValidators");

const router = Router()

// get all products - public
router.get('/', productsGet)

// get product by id - public
router.get('/:id',[
    check('id', "Not a valid id").isMongoId().custom(existProductById),
    validateFields
], productGet)

// create product - private - administrator role only
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', "Name is required").not().isEmpty(),
    check('slug', "Slug is required").not().isEmpty(),
    check('category_slug', "category_slug is required").not().isEmpty().custom(existCategoryBySlug),
    validateSlug,
    validateFields
], productCreate)

// update product - private - administrator role only
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', "Not a valid id").isMongoId().custom(existProductById),
    validateFields
], productUpdate)

// delete product - private - administrator role only
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', "Not a valid id").isMongoId().custom(existProductById),
    validateFields
], productDelete)

module.exports = router