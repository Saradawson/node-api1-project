
const express = require('express');
const user = require('./users/model')
const server = express();

server.get('/api/users', (req, res) => {
    user.find()
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

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; 
