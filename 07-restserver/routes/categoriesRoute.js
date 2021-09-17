const {Router} = require('express')
const {check} = require("express-validator");
const {validateJWT, isAdminRole,validateFields, validateSlug} = require("../middlewares");
const {categoriesGet, categoryGet, categoryCreate, categoryUpdate, categoryDelete} = require("../controllers/categoryController");
const {existCategoryById} = require("../helpers/dbValidators");

const router = Router()

// get all categories - public
router.get('/', categoriesGet)

// get category by id - public
router.get('/:id',[
    check('id', "Not a valid id").isMongoId().custom(existCategoryById),
    validateFields
], categoryGet)

// create category - private - administrator role only
router.post('/', [
    validateJWT,
    isAdminRole,
    check('name', "Name is required").not().isEmpty(),
    check('slug', "Slug is required").not().isEmpty(),
    validateSlug,
    validateFields
], categoryCreate)

// update category - private - administrator role only
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id', "Not a valid id").isMongoId().custom(existCategoryById),
    validateFields
], categoryUpdate)

// delete category - private - administrator role only
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', "Not a valid id").isMongoId().custom(existCategoryById),
    validateFields
], categoryDelete)

module.exports = router