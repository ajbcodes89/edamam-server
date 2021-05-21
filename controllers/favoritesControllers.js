const router = require('express').Router();
const Favorites = require('../models/favorites');
const validate = require('../middleware/validation');

router.get('/test', (req,res) => res.send('Favorites test Controller'));

router.post("/add", validate, (req, res) => {
  const favoritesEntry = {
    user_id: req.user.id,
    recipeId: req.body.favorites.recipeId,
    imageURL: req.body.favorites.imageURL,
    title: req.body.favorites.title,
    note: req.body.favorites.note,
  };
  Favorites.create(favoritesEntry)
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validate, (req, res) => {
  let userid = req.user.id;
  Favorites.findAll({
    where: { user_id: userid },
  })
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) => res.status(500).json({ error: err }));
});




module.exports = router;