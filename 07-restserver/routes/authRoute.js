const {Router} = require('express')
const {check} = require("express-validator");
const {login, googleSignIn} = require("../controllers/authController");
const {validateFields} = require("../middlewares/validateFields");

const router = Router()

router.post('/login',[
    check('email', "The email is required or is invalid").isEmail(),
    check('password', "Password is required").not().isEmpty(),
    validateFields
], login)

router.post('/google',[
    check('id_token', "The id_token is required").not().isEmpty(),
    validateFields
], googleSignIn)

module.exports = router