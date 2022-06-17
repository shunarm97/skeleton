const { toPromise } = require("../utils/toPromise")
const userControllers = require('./users.controllers')


const getMyUserData = (req, res) => {
    console.log('this is the authenticated user email:',req.user.email)
    // const [user, error] = toPromise(userControllers.getUserById())
    res.status(200).json({message: 'all good'})
}

module.exports = {
    getMyUserData
}