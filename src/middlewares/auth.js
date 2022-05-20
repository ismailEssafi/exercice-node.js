const jwt = require('jsonwebtoken');


exports.isLogedIn = (req, res, next) => {
    try{
        let token = req.get('x-auth-token');
        if (!token) return res.status(403).json('Access denied');
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.errors) return res.status(401).json('Invalid_token');
        return next()
    }catch (error){
        res.status(500).json({error : error.message})
    }
}