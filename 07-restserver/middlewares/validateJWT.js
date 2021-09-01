const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req, res, next) => {
    const token = req.header('auth-token')

    if( !token ){
        return res.status(401).json({
            msg: "No token exists in the request"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_KEY)
        const auth_user = await User.findById(uid)

        if( !auth_user ){
            return res.status(401).json({
                msg: "Invalid token, the user does not exist in the DB"
            })
        }

        if( !auth_user.state ){
            return res.status(401).json({
                msg: "Invalid token, the user does not exist"
            })
        }

        req.auth_user = auth_user;
        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({
            msg: "Token is not valid"
        })
    }
}

module.exports = {
    validateJWT
}