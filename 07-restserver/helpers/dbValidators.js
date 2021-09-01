const Role = require("../models/role");
const User = require("../models/user");

const isValidRol = async (role = '') => {
    const  existRole = await Role.findOne({role})
    if ( !existRole ) throw  new Error("The role is not valid")
}

const existEmail = async ( email = '') => {
    const  existEmail = await User.findOne({email})
    if ( existEmail ) throw  new Error("Mail already exists")
}

const existUserById = async ( id = '') => {
    const  existUserById = await User.findById(id)
    if ( !existUserById ) throw  new Error("No user exists for that id")
}

module.exports = {
    isValidRol,
    existEmail,
    existUserById
}