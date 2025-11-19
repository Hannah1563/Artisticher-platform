const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await pool.query(
      `SELECT e.*, COUNT(ep.artist_id) as participant_count
       FROM events e
       LEFT JOIN event_participations ep ON e.id = ep.event_id
       GROUP BY e.id
       ORDER BY e.event_date DESC`
    );
    res.json(events.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get single event with participants
router.get("/:id", async (req, res) => {
  try {
    const event = await pool.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
    if (event.rows.length === 0) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Get participants
    const participants = await pool.query(
      `SELECT u.id, u.username, u.email
       FROM users u
       INNER JOIN event_participations ep ON u.id = ep.artist_id
       WHERE ep.event_id = $1`,
      [req.params.id]
    );

    res.json({
      ...event.rows[0],
      participants: participants.rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create new event
router.post("/", async (req, res) => {
  const { name, description, location, event_date, end_date } = req.body;
  try {
    const newEvent = await pool.query(
      "INSERT INTO events (name, description, location, event_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, location, event_date, end_date || null]
    );
    res.json(newEvent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Join event (artist participation)
router.post("/:id/join", async (req, res) => {
  const { artist_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO event_participations (event_id, artist_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [req.params.id, artist_id]
    );
    res.json({ msg: "Joined event successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Leave event
router.delete("/:id/leave", async (req, res) => {
  const { artist_id } = req.body;
  try {
    await pool.query(
      "DELETE FROM event_participations WHERE event_id = $1 AND artist_id = $2",
      [req.params.id, artist_id]
    );
    res.json({ msg: "Left event successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
