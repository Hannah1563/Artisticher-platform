const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const multer = require("multer");
const path = require("path");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await pool.query("SELECT * FROM artworks ORDER BY created_at DESC");
    res.json(artworks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add artwork
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, user_id } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const newArtwork = await pool.query(
      "INSERT INTO artworks (title, description, image_url, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, image_url, user_id]
    );
    res.json(newArtwork.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete artwork
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM artworks WHERE id = $1", [req.params.id]);
    res.json({ msg: "Artwork deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update artwork
router.put("/:id", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const updatedArtwork = await pool.query(
      "UPDATE artworks SET title=$1, description=$2, image_url=COALESCE($3,image_url) WHERE id=$4 RETURNING *",
      [title, description, image_url, req.params.id]
    );
    res.json(updatedArtwork.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
