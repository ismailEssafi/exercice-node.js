const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
// exports.signIn = '';
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
// exports.forgotPassword = '';
// exports.resetPassword = '';