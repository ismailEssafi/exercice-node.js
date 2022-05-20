const express = require('express');
const app = express.Router();

const users = require('../controller/users');

app.post('/signIn', users.signIn);
app.post('/signUp', users.signUp);
app.post('/forgotPassword', users.forgotPassword);
// app.post('/resetPassword', users.resetPassword);

module.exports = app;
