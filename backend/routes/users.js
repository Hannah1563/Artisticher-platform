// backend/routes/users.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//
// ================================
// USER REGISTRATION
// ================================
//

// @route   POST /api/users/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password, bio, location } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, bio, location) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, bio || null, location || null]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: newUser.rows[0].id,
        username: newUser.rows[0].username,
        email: newUser.rows[0].email,
        bio: newUser.rows[0].bio,
        location: newUser.rows[0].location
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//
// ================================
// LOGIN
// ================================
//

// @route   POST /api/users/login
// @desc    Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email,
        bio: user.rows[0].bio,
        location: user.rows[0].location
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//
// ================================
// GET ALL ARTISTS
// ================================
//

// @route   GET /api/users/artists
// @desc    Get all artists
router.get("/artists", async (req, res) => {
  try {
    const artists = await pool.query(
      "SELECT id, username, bio, location FROM users ORDER BY username"
    );
    res.json(artists.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//
// ================================
// GET SINGLE ARTIST BY ID
// ================================
//

// @route   GET /api/users/:id
// @desc    Get a single artist by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await pool.query(
      "SELECT id, username, bio, location, email FROM users WHERE id = $1",
      [id]
    );

    if (artist.rows.length === 0) {
      return res.status(404).json({ msg: "Artist not found" });
    }

    res.json(artist.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

