const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/events - list all events
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, title, description, date, location, image_url
       FROM events
       ORDER BY date DESC`
    );

    // Return array directly so frontend can do events.map(...)
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id - get single event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT 
        e.*,
        u.username as organizer_name,
        COALESCE(e.organizer, u.username) as organizer_display
      FROM events e
      LEFT JOIN users u ON e.organizer_id = u.id
      WHERE e.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ event: result.rows[0] });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/events - create event (protected, artists only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, event_date, location, venue, image_url, capacity, price } = req.body;
    const organizerId = req.user.userId;

    // Get organizer name
    const userResult = await db.query('SELECT username FROM users WHERE id = $1', [organizerId]);
    const organizerName = userResult.rows[0]?.username;

    const result = await db.query(
      `INSERT INTO events (title, description, event_date, location, venue, organizer_id, organizer, image_url, capacity, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [title, description, event_date, location, venue, organizerId, organizerName, image_url, capacity || 100, price || 0]
    );

    res.status(201).json({ 
      message: 'Event created successfully',
      event: result.rows[0] 
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// POST /api/events/:id/join - join event (protected)
router.post('/:id/join', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    await db.query(
      'INSERT INTO event_participants (event_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [id, userId]
    );
    
    res.json({ message: 'Successfully joined event' });
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ error: 'Failed to join event' });
  }
});

module.exports = router;
