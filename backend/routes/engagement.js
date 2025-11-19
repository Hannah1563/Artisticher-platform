const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Like an artwork
router.post("/:artwork_id/like", async (req, res) => {
  try {
    const updated = await pool.query(
      `UPDATE engagement 
       SET likes = likes + 1, updated_at = CURRENT_TIMESTAMP
       WHERE artwork_id = $1
       RETURNING *`,
      [req.params.artwork_id]
    );
    
    if (updated.rows.length === 0) {
      // Create engagement record if it doesn't exist
      const created = await pool.query(
        "INSERT INTO engagement (artwork_id, likes) VALUES ($1, 1) RETURNING *",
        [req.params.artwork_id]
      );
      return res.json(created.rows[0]);
    }
    
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Increment views
router.post("/:artwork_id/view", async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO engagement (artwork_id, views) VALUES ($1, 1)
       ON CONFLICT (artwork_id) 
       DO UPDATE SET views = engagement.views + 1, updated_at = CURRENT_TIMESTAMP`,
      [req.params.artwork_id]
    );
    res.json({ msg: "View recorded" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get engagement stats for artwork
router.get("/:artwork_id", async (req, res) => {
  try {
    const engagement = await pool.query(
      "SELECT * FROM engagement WHERE artwork_id = $1",
      [req.params.artwork_id]
    );
    res.json(engagement.rows[0] || { views: 0, likes: 0, shares: 0 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
