const db = require('../config/db');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM events ORDER BY event_date DESC'
    );
    res.json({ events: result.rows });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get single event
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ event: result.rows[0] });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, event_date, location, image_url } = req.body;
    const userId = req.user.userId;

    const result = await db.query(
      `INSERT INTO events (title, description, event_date, location, image_url, organizer_id) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [title, description, event_date, location, image_url, userId]
    );

    res.status(201).json({ event: result.rows[0] });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Join event
exports.joinEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if event exists
    const eventResult = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if already joined
    const checkResult = await db.query(
      'SELECT * FROM event_participants WHERE event_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    // Add participant
    await db.query(
      'INSERT INTO event_participants (event_id, user_id) VALUES ($1, $2)',
      [id, userId]
    );

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ error: 'Failed to join event' });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date, location, image_url } = req.body;

    const result = await db.query(
      `UPDATE events 
       SET title = $1, description = $2, event_date = $3, location = $4, image_url = $5 
       WHERE id = $6 
       RETURNING *`,
      [title, description, event_date, location, image_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ event: result.rows[0] });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      'DELETE FROM events WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};