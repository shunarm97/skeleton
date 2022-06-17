const chai = require('chai')
const chaiHttp = require('chai-http')

const {describe, it, before } = require('mocha')
const app = require('../../app').app
const usersControllers = require('../../users/users.controllers')

chai.use(chaiHttp)

before(() => {
    usersControllers.registerUser({
        name: 'Admin',
        email: 'sahid.kick@academlo.com',
        password: 'root',
        username: 'admin',
        age: 21,
        image_profile: '',
    })
})


describe('Siute de integracion para el AUTH', () =>{ 
    //? test a ruta protegida
    it('Should return 401 when node jwt available', (done) => {
        chai.request(app)
        .get('/api/v1/post')
        .end((err, res) => {
            chai.assert.equal(res.status, 401)
            done()
        }) 
    })
    //? test a login sin data
    it('Should return 400 when no data id provided', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .end((err, res) => {
                chai.assert.equal(res.status, 400)
                done()
            })
    })
    //? test a login con informacion correcta
    it('should return 200 when jwt is valid', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .set("content-type", "application/json")
            .send({
                email: "alexander.1234@gmail.com",
                password: "root"
            })
            end((err, res) => {
                chai.assert.equal(res.status, 200)
                chai.assert.typeOf(res.body.token, 'string')
                done()
            })

    })
})



