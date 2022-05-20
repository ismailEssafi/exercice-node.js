const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true ,trim:true},
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('user', schema);