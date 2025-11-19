const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get all sales
router.get("/", async (req, res) => {
  try {
    const sales = await pool.query(
      `SELECT s.*, a.title as artwork_title, a.image_url, u.username as artist_name
       FROM sales s
       LEFT JOIN artworks a ON s.artwork_id = a.id
       LEFT JOIN users u ON a.user_id = u.id
       ORDER BY s.sale_date DESC`
    );
    res.json(sales.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create new sale (purchase artwork)
router.post("/", async (req, res) => {
  const { buyer_name, buyer_email, artwork_id, amount } = req.body;
  try {
    // Check if artwork exists
    const artwork = await pool.query("SELECT * FROM artworks WHERE id = $1", [artwork_id]);
    if (artwork.rows.length === 0) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    const newSale = await pool.query(
      "INSERT INTO sales (buyer_name, buyer_email, artwork_id, amount) VALUES ($1, $2, $3, $4) RETURNING *",
      [buyer_name, buyer_email, artwork_id, amount]
    );
    res.json(newSale.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get sales by artist
router.get("/artist/:user_id", async (req, res) => {
  try {
    const sales = await pool.query(
      `SELECT s.*, a.title as artwork_title
       FROM sales s
       LEFT JOIN artworks a ON s.artwork_id = a.id
       WHERE a.user_id = $1
       ORDER BY s.sale_date DESC`,
      [req.params.user_id]
    );
    res.json(sales.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
