const express = require('express');
const app = express.Router();
const users = require('./authentication')

app.use('/authentication', users)

module.exports = app;
