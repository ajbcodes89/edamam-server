const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");

router.use(cors());

router.get('/test', (req,res) => { //endpoints
 res.send('testing control');
});

router.post('/register', (req,res) => {
        User.create({
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 5)
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, 'I_AM_SECRET', {expiresIn: '1d'})
        res.send({ user, token })
    })
    .catch(error => res.status(317).send({
        message: 'user not created', 
        error: error.errors[0].message
    }))
})

router.post('/login', (req, res) => {
    User.findOne({ 
        where: { 
            userName: req.body.userName
        } 
    })
     .then(user => {
       if(user){ 
           bcrypt.compare(req.body.password, user.password, 
        function(err, matches){
           matches ? generateToken(user) : 
           res.send('Error! Try Again')
       })
       function generateToken(user) {
           let token = jwt.sign({ id: user.id }, 'I_AM_SECRET', {expiresIn: '1d' });
           res.send({user, token})
       }

    } else {
   res.send('No info found');

       }
   }) 
})

module.exports = router;