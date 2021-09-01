const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require("../models/user");
const {generateJWT} = require("../helpers/generateJWT");

const login = async (req, res = response) => {
    const {email, password} = req.body
    try {
        // we verify the mail
        const  user = await User.findOne({email, state: true})
        if( !user){
            return res.status(400).json({
                msg: "Incorrect email"
            })
        }

        //we verify the password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if( !validPassword){
            return res.status(400).json({
                msg: "Incorrect password"
            })
        }

        // JWT
        const token = await generateJWT(user.id)

        res.json({
            msg: "Login success",
            user,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Something went wrong, contact the administrator"
        })
    }
}

module.exports = {
    login
}