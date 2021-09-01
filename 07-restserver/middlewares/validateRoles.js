const {response} = require("express");

const isAdminRole = (req, res = response, next) => {
    if( !req.auth_user ){
        return res.status(500).json({
            msg: "Validate token is required. Non-authenticated user"
        })
    }

    const {role} = req.auth_user

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: "User is not administrator"
        })
    }

    next()
}
const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if( !req.auth_user ){
            return res.status(500).json({
                msg: "Validate token is required. Non-authenticated user"
            })
        }

        if( !roles.includes(req.auth_user.role )){
            return res.status(401).json({
                msg: `The service requires the following roles ${roles}`
            })
        }

        next()
    }
}

module.exports = {
    isAdminRole,
    hasRole
}