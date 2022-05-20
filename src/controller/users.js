const User = require('../models/user.js');
const jwt = require('jsonwebtoken');


exports.create = async (req, res) => {
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
        res.status(500).json({error : error.message})
    }
}

exports.getAll = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json({
            status: 'succes',
            data : users,
        });
    }catch (error){
        res.status(500).json({error : error.message})
    }
}

exports.get = async (req, res) => {
    try{
        const users = await User.find({_id: req.params.id});
        res.status(200).json({
            status: 'succes',
            data : users,
        });
    }catch (error){
        res.status(500).json({error : error.message})
    }
}

exports.update = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate({_id :req.params.id}, req.body);
        
        res.status(200).json({
            status: 'succes',
            data : user,
        });
    }catch (error){
        res.status(500).json({error : error.message})
    }
}

exports.delete = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete({_id :req.params.id});
        
        res.status(200).json({
            status: 'succes',
            data : user,
        });
    }catch (error){
        res.status(500).json({error : error.message})
    }
}

