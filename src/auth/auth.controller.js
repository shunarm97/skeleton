const usersControllers = require('../users/users.controllers')
const crypto = require('../utils/crypo')
const { toPromise } = require('../utils/toPromise')


const checkUsersCredential = async(email, password) => {
    const [user, err] = await toPromise(usersControllers.getUserByEmail(email))
    if (!err && user.dataValues) {
        return crypto.comparePassword(password, user.password)
     } else {
         return null
     }

} 

module.exports = {
    checkUsersCredential

}
