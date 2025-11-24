const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("✅ Database connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ Database error:", err);
});

// Export in the format your routes expect
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};

// This file re-exports db.js for compatibility
module.exports = require('./db');

