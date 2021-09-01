const {Router} = require('express')
const {check} = require("express-validator");
const {userGet, userUpdate, userCreate, userDelete} = require("../controllers/userController");
const {isValidRol, existEmail, existUserById} = require("../helpers/dbValidators");
const { validateFields, validateJWT, hasRole, isAdminRole } = require('../middlewares')

const router = Router()

router.get('/', userGet)

router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', "Not a valid id").isMongoId().custom(existUserById),
    check('role').custom(isValidRol),
    validateFields
], userUpdate)

router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', "Name is required").not().isEmpty(),
    check('password', "Password is required and more than 6 characters").isLength({min: 6}),
    check('email', "The email is invalid").isEmail().custom(existEmail),
    check('role').custom(isValidRol),
    validateFields
], userCreate)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', "Not a valid id").isMongoId().custom(existUserById),
    validateFields
], userDelete)

module.exports = router