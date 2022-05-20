const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./src/config/db')
const routes = require('./src/routes');

db.start();

app.use(express.json());
app.use('/api', routes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})