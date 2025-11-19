const express = require('express');
const router = express.Router();

// Mock data for events
const events = [
  {
    id: 1,
    title: 'Art Exhibition',
    date: '2023-10-15',
    location: 'Gallery One',
    description: 'Join us for an evening of art and culture.',
  },
  {
    id: 2,
    title: 'Painting Workshop',
    date: '2023-11-05',
    location: 'Art Studio',
    description: 'Learn painting techniques from professional artists.',
  },
];

// GET /api/events - Retrieve all events
router.get('/', (req, res) => {
  res.json(events);
});

// GET /api/events/:id - Retrieve a specific event by ID
router.get('/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).send('Event not found');
  res.json(event);
});

module.exports = router;