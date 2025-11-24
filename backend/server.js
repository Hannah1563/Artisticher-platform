const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());               // <-- IMPORTANT
app.use(express.urlencoded({ extended: true }));

// Simple logger
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// DB test
db.query('SELECT NOW()', (err) => {
  if (err) console.error('❌ DB connection error:', err);
  else console.log('✅ Database connected');
});

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const artworkRoutes = require('./routes/artworkRoutes');
const eventRoutes = require('./routes/eventRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

