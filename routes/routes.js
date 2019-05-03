const route = require('express').Router()
const user = require('./user')
const playlist = require('./playlist')

route.use('/user', user)
route.use('/playlist',playlist)

module.exports = route