const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.post('/create', UserController.create)
route.get('/findAll', UserController.findAll)
route.post('/googleSignIn', UserController.googleSignIn)

module.exports = route
