const express = require('express');
const app = express.Router();
const authentication = require('./authentication')
const users = require('./users')

app.use('/authentication', authentication)
app.use('/users', users)

module.exports = app;
