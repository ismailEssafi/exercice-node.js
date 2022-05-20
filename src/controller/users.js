const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const sendEmail = require('../utils/email');

exports.signIn = async (req, res) => {

    try{
        const {email, password} = req.body;
        const user = await User.findOne({email : email})
        if(!user) return res.status(400).json('incorrect email or password');
        const compare = await bcrypt.compare(String(password), user.password);
        if (!compare) return res.status(400).json('incorrect email or password');
        const id = user._id
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn : process.env.EXPIRE_IN
        });
        return res.status(200).json({
            status: 'succes',
            data : user,
            token : token
        });
    }catch (error){
        res.status(500).json({error : error.message})
    }
};
exports.signUp = async (req, res) => {
    try{
        const user = await User.create(req.body);
        const id = user._id
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn : process.env.EXPIRE_IN
        });
        res.status(200).json({
            status: 'succes',
            data : user,
            token : token
        });
    }catch (error){
        res.status(400).json({
            status: 'fail',
            error : error.message
        })
    }
}
exports.forgotPassword = async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        if(!user) return res.status(400).json('user not found');

        //generate random reset token
        const resetToken = user.resetPassword();
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
        const message = `if you forgot your password click here : ${resetUrl}`;

        await sendEmail({
            email : user.email,
            subject : 'this email expire after 10 min',
            message : message
        })

        res.status(200).json({
            status : 200
        })
    }catch (error){
        res.status(500).json({
            error : error.message
        })
    }
};