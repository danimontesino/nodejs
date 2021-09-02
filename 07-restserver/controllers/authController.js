const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require("../models/user");
const {generateJWT} = require("../helpers/generateJWT");
const {googleVerify} = require("../helpers/googleVerify");

const login = async (req, res = response) => {
    const {email, password} = req.body
    try {
        // we verify the mail
        const  user = await User.findOne({email, state: true, google: false})
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

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body

    try {
        const {email, img, name} = await googleVerify(id_token)
        let user = await User.findOne({ email })

        if (!user ){
            // Create user
            const data = {
                name,
                email,
                password: ':G',
                img,
                google: true
            }

            user = new User( data )
            await user.save()
        }

        // if user state is false
        if ( !user.state ){
            res.status(401).json({
                msg: "Check with administrator, user locked",
            })
        }

        // JWT
        const token = await generateJWT(user.id)

        res.json({
            msg: "User successfully registered with google",
            user,
            token
        })
    } catch (err) {
        res.status(400).json({
            msg: "Invalid google token"
        })
    }
}

module.exports = {
    login,
    googleSignIn
}