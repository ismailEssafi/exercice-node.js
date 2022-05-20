const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true ,trim:true},
    password: { type: String, required: true },
    passwordResetToken: {type: String},
    passwordResetExpireTime: {type : Date},    
    deletedAt: { type: Date, default: null },
}, { timestamps: true });

schema.pre("save", async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

schema.methods.resetPassword = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpireTime = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('user', schema);