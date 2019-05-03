const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const jwt = require('../helpers/jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

class UserController {
    static googleSignIn(req, res) {
        client
            .verifyIdToken({
                idToken: req.headers.access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                let payload = ticket.getPayload()
                let foundUser = User.findOne({ email: payload.email })

                return Promise.all([payload, foundUser])

            })
            .then(([payload, foundUser]) => {
                if (!foundUser) {
                    return User
                        .create({
                            name: payload.name,
                            email: payload.email,
                            picture: payload.picture
                        })
                } else {
                    return foundUser
                }
            })
            .then(user => {
                const myToken = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                }, process.env.SECRET, { expiresIn: `1 day` })

                res.status(200).json({
                    token: myToken
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }

    // static googleSignIn(req, res) {
    //     client.verifyIdToken({
    //         idToken: req.headers.access_token,
    //         audience: process.env.GOOGLE_CLIENT_ID
    //     })
    //         .then(ticket => {
    //             const { name, email, picture } = ticket.getPayload()

    //             let myToken = jwt.sign({ name, email, picture },
    //                 process.env.SECRET, { expiresIn: `1 day` })

    //             res.status(200).json({
    //                 token: myToken,
    //                 message: "berhasil",
    //                 data: {
    //                     name, email, picture
    //                 }
    //             })
    //         })
    //         .catch(err => {
    //             res.status(500).json(err)
    //         })
    // }



    static create(req, res) {
        const { name, email, picture } = req.body
        User.create({ name, email, picture })
            .then(user => {
                res.status(200).json('user')
            })
            .catch(err => {
                res.status(500).json('err')
            })
    }

    static findAll(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController