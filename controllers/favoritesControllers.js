const router = require("express").Router();
const Favorites = require("../models/favorites");
const validate = require("../middleware/validation");

router.get("/test", (req, res) => res.send("Favorites test Controller"));

router.post("/add", (req, res) => {
  Favorites.create({
    user_id: req.body.user_id,
    imageURL: req.body.imageURL,
    title: req.body.title,
    note: req.body.note,
  })
    .then((favorites) => res.status(200).json(favorites))
    .catch((err) =>
      res.status(500).json({ error: "Create favorites for user failed" })
    );
});

router.get("/mine", (req, res) => {
  Favorites.findAll()
    .then((mine) =>
      res.status(200).json({
        message: `Found ${mine.length} Favorite Recipes!`,
        count: mine.length,
        mine,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: "No Favorites found", err })
    );
});
//note




// update a favorite
router.put('/update/:id', validate, (req, res) => {
    Favorites.update(req.body, { where: { id: req.params.id } })
    .then(updated => res.status(200).json({ message: `Successfully updated favorite ${req.params.id}`, updated }))
    .catch(err => res.status(500).json({ message: 'Update failed', err }))
})

// delete a favorite (remove? un-favorite?)
router.delete('/delete/:id', validate, (req, res) => {
    Favorites.destroy({ where: { id: req.params.id } })
      .then(deleted => res.status(200).json({ message: `Successfully deleted favorite ${req.params.id}`, deleted }))
      .catch(err => res.status(500).json({ message: 'Delete failed', err }))
})

module.exports = router;

