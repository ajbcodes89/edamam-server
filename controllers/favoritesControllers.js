const router = require('express').Router();
const Favorites = require('../models/favorites');
const validate = require('../middleware/validation');

router.get('/test', (req,res) => res.send('Favorites test Controller'));

router.post("/add", (req, res) => {
  Favorites.create({
    user_id: req.body.user_id,
    recipeId: req.body.recipeId,
    imageURL: req.body.imageURL,
    title: req.body.title,
    note: req.body.note,
  })
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: 'Create favorites for user failed'}));
});

router.get("/mine", (req, res) => {
    Favorites.findAll() 
    .then(mine => res.status(200).json({ message: `Found ${mine.length} Favorite Recipes!` , count:mine.length, mine }))
    .catch(err => res.status(500).json({ message: 'No Favorites found', err }))
})

module.exports = router;