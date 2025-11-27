require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require('path');
const db = require('./config/db');

const app = express();

// CORS configuration
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple logger
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

