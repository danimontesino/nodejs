const {Router} = require('express')
const {userGet, userUpdate, userCreate, userDelete} = require("../controllers/userController");

const router = Router()

router.get('/', userGet)

router.put('/:id', userUpdate)

router.post('/', userCreate)

router.delete('/', userDelete)

module.exports = router