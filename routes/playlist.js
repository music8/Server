const route = require('express').Router()
const playlist = require('../controllers/playlist')

route.delete('/:id', playlist.deletePlaylist)
route.Post('/:id', playlist.deletePlaylist)
route.get('/',playlist.findAllPlaylist)


module.exports = route
