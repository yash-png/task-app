const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = async(req, res, next) => {
    console.log('Auth middleware');
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); //add space after bearer
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send("Error:Please Authenticate ");
        console.log(e);
    }

};

module.exports = auth;