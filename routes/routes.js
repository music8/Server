const route = require('express').Router()
const user = require('./user')

route.use('/user', user)

module.exports = route