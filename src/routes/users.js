const express = require('express');
const app = express.Router();
const authToken = require('../middlewares/auth');
const users = require('../controller/users');

app.use(authToken.isLogedIn)
app.route('/').post(users.create).get(users.getAll);
app.route('/:id').patch(users.update).delete(users.delete).get(users.get)

module.exports = app;