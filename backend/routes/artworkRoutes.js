const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/artworks - list all artworks
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT a.*, u.username AS artist_name
      FROM artworks a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
    `);

    // Return array directly so frontend can do artworks.map / filter
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching artworks:', err);
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
});

// POST /api/artworks - create artwork (artist only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, price, image_url, category } = req.body;
    const userId = req.user.userId;

    const u = await db.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (u.rows[0]?.role !== 'artist') {
      return res.status(403).json({ error: 'Only artists can add artworks' });
    }

    const p = parseFloat(price);
    if (isNaN(p) || p <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }
    if (p > 50000) {
      return res.status(400).json({ error: 'Price cannot exceed 50,000 RWF' });
    }

    const result = await db.query(
      `INSERT INTO artworks (user_id, title, description, price, image_url, category)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, title, description, p, image_url, category]
    );

    res.status(201).json({
      success: true,
      message: 'Artwork created successfully',
      artwork: result.rows[0],
    });
  } catch (err) {
    console.error('Error creating artwork:', err);
    res.status(500).json({ error: 'Failed to create artwork' });
  }
});

module.exports = router;