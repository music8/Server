const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// const jwt = require('../helpers/jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

class UserController {
    static googleSignIn(req, res) {
        client
            .verifyIdToken({
                idToken: req.headers.access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                let payload = ticket.getPayload()
                let foundUser = User.findOne({
                    email: payload.email
                })

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
                    email: user.email
                }, process.env.SECRET, {
                    expiresIn: `1 day`
                })

                res.status(200).json({
                    token: myToken
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })

    }
    static create(req, res) {
        const {
            name,
            email,
            password
        } = req.body
        const hash = bcrypt.hashSync(password, 8)
        User
            .create({
                name,
                password: hash,
                email
            })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static regularLogin(req, res) {
        let {
            email,
            password
        } = req.body
        User.findOne({
                email
            })
            .then(user => {
                console.log(user)
                if (!user) {
                    res.status(400).json({
                        msg: 'Please check your input'
                    })
                } else {
                    console.log(password);
                    console.log(user.password);
                    console.log(bcrypt.compareSync(password, user.password));



                    if (bcrypt.compareSync(password, user.password)) {
                        console.log('poppopopo')
                        let token = jwt.sign({
                            _id: user._id,
                            name: user.name,
                            email
                        }, process.env.SECRET, {
                            expiresIn: `1 day`
                        })
                        res.status(200).json({
                            msg: 'You have successfully logged in!',
                            token
                        })
                    } else {
                        console.log('salah')
                        res.status(400).json({
                            msg: 'please check your input!'
                        })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'ERROR,',
                    err
                })
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