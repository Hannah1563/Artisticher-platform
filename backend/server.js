const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const path = require("path");

// Middleware
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/artworks", require("./routes/artworks"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

