const express = require('express');
const app = express.Router();

const users = require('../controller/authentication');

app.post('/signIn', users.signIn);
app.post('/signUp', users.signUp);
app.post('/forgotPassword', users.forgotPassword);
app.post('/resetPassword/:token', users.resetPassword);

module.exports = app;
