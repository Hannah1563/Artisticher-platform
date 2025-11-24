const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Global search
router.get('/', async (req, res) => {
  try {
    const { q, type = 'all', limit = 10 } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchTerm = `%${q}%`;
    const results = {
      artworks: [],
      artists: [],
      courses: [],
      events: []
    };

    // Search artworks
    if (type === 'all' || type === 'artworks') {
      const artworkResult = await db.query(`
        SELECT 
          a.id,
          a.title,
          a.description,
          a.price,
          a.image_url,
          a.category,
          u.username as artist_name
        FROM artworks a
        JOIN users u ON a.user_id = u.id
        WHERE a.title ILIKE $1 OR a.description ILIKE $1 OR a.category ILIKE $1
        LIMIT $2
      `, [searchTerm, parseInt(limit)]);
      results.artworks = artworkResult.rows;
    }

    // Search artists
    if (type === 'all' || type === 'artists') {
      const artistResult = await db.query(`
        SELECT 
          u.id,
          u.username,
          u.bio,
          u.profile_image,
          COUNT(a.id) as artwork_count
        FROM users u
        LEFT JOIN artworks a ON u.id = a.user_id
        WHERE u.username ILIKE $1 OR u.bio ILIKE $1
        GROUP BY u.id, u.username, u.bio, u.profile_image
        HAVING COUNT(a.id) > 0
        LIMIT $2
      `, [searchTerm, parseInt(limit)]);
      results.artists = artistResult.rows;
    }

    // Search courses
    if (type === 'all' || type === 'courses') {
      const courseResult = await db.query(`
        SELECT 
          c.id,
          c.title,
          c.description,
          c.price,
          c.level,
          c.image_url,
          u.username as instructor_name
        FROM courses c
        JOIN users u ON c.instructor_id = u.id
        WHERE c.title ILIKE $1 OR c.description ILIKE $1
        LIMIT $2
      `, [searchTerm, parseInt(limit)]);
      results.courses = courseResult.rows;
    }

    // Search events
    if (type === 'all' || type === 'events') {
      const eventResult = await db.query(`
        SELECT 
          id,
          title,
          description,
          event_date,
          location,
          venue,
          image_url,
          price
        FROM events
        WHERE title ILIKE $1 OR description ILIKE $1 OR location ILIKE $1
        LIMIT $2
      `, [searchTerm, parseInt(limit)]);
      results.events = eventResult.rows;
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;