const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validation = (req, res, next) => {
    const token = req.headers.authorization;

     if(!token) {
         return res.status(504).json({
             auth: false,
             message: 'token not available'
         })
     } else {
         jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
             if(!err && decodedToken) {
               User.findOne({
                   where: {
                       id: decodedToken.id
                   }
               })
                .then(user => {
                    if(!user) throw err;

                    req.user = user;
                    return next();
                })
                .catch(err => next(err))
            
            } else {
                 req.errors = err;
                 return res.status(400).send('not allowed');
             }
         })
     }
}

module.exports = validation;