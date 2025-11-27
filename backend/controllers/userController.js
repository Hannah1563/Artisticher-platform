const db = require('../config/db');

// Get all artists
exports.getArtists = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE role = 'artist'");
    res.json(result.rows); // <-- This returns an array!
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT id, username, email, role, profile_image, bio FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Update user bio
exports.updateBio = async (req, res) => {
  const userId = req.params.id;
  const { bio } = req.body;
  try {
    await db.query('UPDATE users SET bio = $1 WHERE id = $2', [bio, userId]);
    res.json({ success: true, message: 'Bio updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bio' });
  }
};

// Get user bio
exports.getBio = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.query('SELECT bio FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ bio: result.rows[0].bio });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bio' });
  }
};