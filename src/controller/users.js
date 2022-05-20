const User = require('../models/user.js');

// exports.signIn = '';
exports.signUp = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(200).json({
            status: 'succes',
            data : user
        })
    }catch{
        res.status(400).json({
            status: 'fail'
        })
    }
}
// exports.forgotPassword = '';
// exports.resetPassword = '';