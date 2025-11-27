const express = require('express');
const router = express.Router();
const db = require('../config/db');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/users/artists - list all artists
router.get('/artists', userController.getArtists);

// GET /api/users/:id - single user
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.get('/:id/bio', userController.getBio);

// Update artist bio (protected)
router.put('/:id/bio', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;

  // Only allow if the logged-in user matches the id in the URL
  if (parseInt(id) !== req.user.id) {
    return res.status(403).json({ message: 'You can only update your own bio.' });
  }

  try {
    const result = await db.query(
      'UPDATE users SET bio = $1 WHERE id = $2 RETURNING bio',
      [bio, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Bio updated', bio: result.rows[0].bio });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;