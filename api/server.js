
const express = require('express');
const User = require('./users/model');
const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    User.insert({name, bio})
        .then(newUser => {
            if(!name || !bio){
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            }else{
                res.status(201).json({
                    id: newUser.id,
                    name: newUser.name,
                    bio: newUser.bio
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the user to the database"
            })
        })

})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                err: err.message,
                stack: err.stack,
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: `does not exist`
                })
            }else{
            res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: `error getting user`,
                err: err.message,
                stack: err.stack,
            })
        })
}) 

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; 
