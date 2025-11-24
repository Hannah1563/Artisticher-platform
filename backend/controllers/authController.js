const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role`,
      [username, email, hashedPassword, role || 'user']
    );

    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error('❌ Registration error:', err);

    // Handle unique username or email error
    if (err.code === '23505') {
      if (err.detail && err.detail.includes('username')) {
        return res.status(400).json({ success: false, error: 'Username already exists' });
      }
      if (err.detail && err.detail.includes('email')) {
        return res.status(400).json({ success: false, error: 'Email already in use' });
      }
    }

    res.status(500).json({ success: false, error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      'SELECT id, username, email, password, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};