const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true ,trim:true},
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });

schema.pre("save", async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('user', schema);