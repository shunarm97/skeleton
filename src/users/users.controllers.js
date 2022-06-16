const crypto = require('../utils/crypo')
const uuid = require('uuid')

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

const registerUser = (data) => {
    const hashedPassword = crypto.hashPassword(data.password)
    const userId = uuid.v4()
    const newUser = {
        id : userId,
        ...data,
        password: hashedPassword,
        active: false,
        role: "normal"
    }
    userDB.push(newUser)
    return {
        message:  `User created succesfully with the id ${userId}`,
        user: newUser
    }
}


const getUserByEmail = (email) => {
    const user = userDB.filter((item) => item.email === email)
    return user[0]
}


module.exports = {
    registerUser,
    getUserByEmail,
    userDB
}

// console.log(registerUser({
//     name: "alexander",
//     email: "admin@admin",
//     password: "1234",
//     user_name: "root",
//     age: 25,
//     image_profile: "",
// }))

