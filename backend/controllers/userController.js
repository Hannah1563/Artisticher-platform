const db = require('../config/db');

// Get all artists
exports.getArtists = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, username, email, role, profile_image, bio FROM users WHERE role = 'artist'"
    );
    res.json({ artists: result.rows });
  } catch (error) {
    console.error('Error fetching artists:', error);
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