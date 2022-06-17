const express = require('express')
const config = require('./config')
const cors = require('cors')

const authRouter = require('./auth/auth.routes').router
const userControlers = require('./users/users.controllers')
const userRouter = require('./users/users.routes').router
const { toPromise } = require('./utils/toPromise')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.get('/api/v1/post', (req,res) => {
    res.status(400).json()
})

app.use('/api/v1/users', userRouter)

app.get('/api/v1/users', async (req, res) => {
    //! userControlers.getAllUsers()
    //! .then((response) => {
    //!     res.status(200).json(response)
    //! })
    const [users, error] = toPromise(userControlers.getAllUsers())

    if(error || !users) {
        res.status(400).json({message: "upps, dio error"})
    }
    res.status(200).json(users)

})

app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)

})



module.exports = {
    app
}