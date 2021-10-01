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

server.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const users = await User.find()
        const foundUser = users.find(u => u.username === username && u.password === password)
        if (foundUser) {
            res.status(200).json({
                message: "Login Successful"
            })
        } else {
            const foundUser2 = users.find(u => u.username === username && u.password !== password)
            if (foundUser2) {
                res.status(200).json({
                    message: "Username and password not valid"
                })
            } else {
                res.status(404).json({
                    message: "Username does not exist"                
                    })
            }
        }
    } catch(err) {
        res.status(500).json({
            message: "There was an error while trying to log you in"
        })
    }
})


module.exports = server