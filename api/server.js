const express = require('express')

const User = require('./users/model')
const cors = require('cors')
const server = express()

server.use(express.json())
server.use(cors())

// [GET] /api/users

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err =>  {
            res.status(500).json({
                message: "The users information could not be retrieved"
            })
        })
})

// [POST] /api/register 
server.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(400).json({
                message: "Please provider a username and password"
            })
        } else {
            const newUser = await User.insert({username, password})
            res.status(201).json(newUser)
        }
    } catch(err) {
        res.status(500).json({
            message: "There was an error while saving the user to the database"
        })
    }
})

// [POST] /api/login

module.exports = server