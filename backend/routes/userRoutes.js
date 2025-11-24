const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // ✅ ADD / ENSURE THIS LINE

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

module.exports = router;