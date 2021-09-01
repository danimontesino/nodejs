const {Router} = require('express')
const {userGet, userUpdate, userCreate, userDelete} = require("../controllers/userController");
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/validateFields");
const {isValidRol, existEmail, existUserById} = require("../helpers/dbValidators");

const router = Router()

router.get('/', userGet)

router.put('/:id', [
    check('id', "Not a valid id").isMongoId().custom(existUserById),
    check('role').custom(isValidRol),
    validateFields
], userUpdate)

router.post('/', [
    check('name', "Name is required").not().isEmpty(),
    check('password', "Password is required and more than 6 characters").isLength({min: 6}),
    check('email', "The email is invalid").isEmail().custom(existEmail),
    check('role').custom(isValidRol),
    validateFields
], userCreate)

router.delete('/:id', [
    check('id', "Not a valid id").isMongoId().custom(existUserById),
    validateFields
], userDelete)

module.exports = router