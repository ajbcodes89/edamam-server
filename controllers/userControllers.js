const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/test', (req,res) => { //endpoints
 res.send('testing control');
});

router.post('/register', (req,res) => {
    User.create({
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 5)
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '90d'})
        res.send({ user, token })
    })
    .catch(error => res.status(317).send({
        message: 'user not created', 
        error: error.errors[0].message
    }))
})

router.post('/login', (req, res) => {
    User.findOne
    ({ where: 
        { username: req.body.username} })
   
     .then(user => {
       if(user) 
       { bcrypt.compare(req.body.password, user.password, 
        function(err, matches){
           matches ? generateToken(user) : 
           res.send('Error! Try Again')
       })
       function generateToken(user) {
           let token = jwt.sign({ id: user.id }, process.env.SECRET, {expiresIn: '90d' });
           res.send({user, token})
       }

    } else {
   res.send('No info found');
       }
       res.send(user)
   }) 
})

module.exports = router;