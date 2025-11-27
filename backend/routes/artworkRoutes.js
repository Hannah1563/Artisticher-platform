const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const db = require('../config/db');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET /api/artworks - list all artworks
router.get('/', artworkController.getAllArtworks);

// GET /api/artworks/my - list artworks by current user
router.get('/my', authMiddleware, artworkController.getMyArtworks);

// POST /api/artworks - create artwork (artist only, with image upload)
router.post('/', authMiddleware, upload.single('image'), artworkController.createArtwork);

// DELETE /api/artworks/:id - delete artwork (owner only)
router.delete('/:id', authMiddleware, async (req, res) => {
  const artworkId = req.params.id;
  const userId = req.user.id;

  // Only allow the owner to delete
  const result = await db.query('SELECT user_id FROM artworks WHERE id = $1', [artworkId]);
  if (!result.rows.length) return res.status(404).json({ error: 'Artwork not found' });
  if (result.rows[0].user_id !== userId) return res.status(403).json({ error: 'Not allowed' });

  await db.query('DELETE FROM artworks WHERE id = $1', [artworkId]);
  res.json({ success: true });
});

// PUT /api/artworks/:id - update artwork (artist only)
router.put('/:id', authMiddleware, artworkController.updateArtwork);

// GET /api/artworks/:id - get artwork by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT a.*, u.username AS artist_name, u.email AS artist_email
       FROM artworks a
       JOIN users u ON a.user_id = u.id
       WHERE a.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: true, artwork: null });
    }
    res.json({ success: true, artwork: result.rows[0] });
  } catch (err) {
    console.error('Error fetching artwork by id:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch artwork' });
  }
});

module.exports = router;