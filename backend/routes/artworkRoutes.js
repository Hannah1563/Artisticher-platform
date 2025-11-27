const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/\s+/g, '');
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

// Create artwork (PROTECTED)
router.post('/', auth, upload.single('image'), artworkController.createArtwork);

// Get all artworks (PUBLIC)
router.get('/', artworkController.getAllArtworks);

// Get single artwork by id (PUBLIC)
router.get('/:id', artworkController.getArtworkById);

// Get my artworks (PROTECTED)
router.get('/me/list', auth, artworkController.getMyArtworks);

module.exports = router;