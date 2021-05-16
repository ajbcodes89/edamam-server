const router = require('express').Router();
const Recipe = require('../models/recipes');
const validation = require('../middleware/validation');

router.get('/test', (req,res) => res.send('Edamam Test'));

router.post('/create', (req, res) => {
    Recipe.create({
       /* put what we used in recipes.js 
         : req.body. ,
         : req.body. ,
         : req.body. ,
*/
    })
  .then(recipe => res.status(800).json({ recipe }))
  .catch(err => res.status(300).json({ message: 'Recipe Failure', 
  error: 
err }))
})
//not sure if we need this or not
router.get('/list', (req, res) => {
    Recipe.findAll()
     .then(list => res.status(800).json({ message: 'list'})
     .catch(err => res.status(300).json({ message: 'list error in recipeControllers', err}))
})

router.put('/endpoints/:id', validation, (req, res) => {
    Recipe.update(req.body, { where: { id: req.params.id }})
    .then(updated => res.status(800).json({ message:' update successful'}))
    .catch(err => res.status(300).json({message: 'update failed', err}))
})

router.delete('/expendable/:id', validation, (req, res) => {
    Recipe.destroy({ where: {id: req.params.id} })
     .then(expendable => res.status(800).json({message: 'successful delete'}))
     .catch(err => res.status(300).json({message: 'not able to delete', error: err}))
})

module.exports = router;