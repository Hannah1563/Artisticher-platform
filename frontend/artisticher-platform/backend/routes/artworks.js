const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork'); // Assuming you have an Artwork model
const auth = require('../middleware/auth');

// Get all artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get artworks by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const artworks = await Artwork.find({ user_id: req.params.userId });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new artwork
router.post('/', auth, async (req, res) => {
  const artwork = new Artwork({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    price: req.body.price,
    user_id: req.user.id, // Assuming you have user ID from the auth middleware
  });

  try {
    const newArtwork = await artwork.save();
    res.status(201).json(newArtwork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;