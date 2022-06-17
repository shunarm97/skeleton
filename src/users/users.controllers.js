const crypto = require('../utils/crypo')
const uuid = require('uuid')
const sequelize = require('../models/index').sequelize
const initModels = require('../models/init-models')

const userDB = []

/*
   {
        id: "",
        name: "",
        email: "",
        password: "",
        user_name: "",
        age: ,
        image_profile: "",
        status: "",
        role: ""
        create_at: "",
        updated_at: "",
    }

*/

const models = initModels(sequelize)

const registerUser = async (data) => {
    const hashedPassword = crypto.hashPassword(data.password)
    const userId = uuid.v4()
    const newUser = models.users.create({
        id : userId,
        ...data,
        password: hashedPassword,
    })
 
    return {
        message:  `User created succesfully with the id ${userId}`,
        user: newUser
    }
}


const getUserById = async (id) => {
    const user = await models.users.findByPk(id)
    return user
}

const getAllUsers = async() => {
    const users = await models.users.findAll({
        attributes : {
            exclude:["password"] 
        }
    })
    return users

}


const getUserByEmail = async (email) => {
    const user = await models.users.findall({
        where: {
            email
        }
    }) 
    return user
}


module.exports = {
    registerUser,
    getUserByEmail,
    userDB,
    getAllUsers,
    getUserById
}

// console.log(registerUser({
//     name: "alexander",
//     email: "admin@admin",
//     password: "1234",
//     user_name: "root",
//     age: 25,
//     image_profile: "",
// }))

