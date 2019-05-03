const User = require('../models/user')

class controllerPlaylist {
    static addPlaylist(req, res) {
        const track_id = req.params.id
        const idUser = req.userLogin
        User
            .findById(idUser)
            .then((user) => {
                let isExist = user.playlist.indexOf(track_id) < 0
                if (isExist) {
                    user.playlist.push(req.track_id)
                    return user.save()
                } else {
                    res.status(400).json({ error: 'You already have this track on your playlist' })
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deletePlaylist(req, res) {
        const track_id = req.params.id
        const idUser = req.userLogin
        User
            .findById(idUser)
            .then((user) => {
                user.playlist = user.playlist.filter(el => el != track_id)
                return user.save()
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAllPlaylist(req, res) {
        const idUser = req.userLogin
        User
            .findById(idUser)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = controllerPlaylist