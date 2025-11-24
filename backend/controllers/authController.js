const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'artisticher_secret_key_2024';

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log('📝 Registration attempt:', { username, email, role });

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const validRoles = ['user', 'artist'];
    const userRole = role || 'user';
    if (!validRoles.includes(userRole)) {
      return res.status(400).json({ error: 'Invalid role. Must be "user" or "artist"' });
    }

    // Ensure password_hash column exists
    await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;`);

    const existing = await db.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (existing.rows.length > 0) {
      const u = existing.rows[0];
      if (u.email === email) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      if (u.username === username) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role, created_at`,
      [username, email, hashed, userRole]
    );
    const user = result.rows[0];

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user
    });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Ensure password_hash column exists (defensive)
    await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;`);

    const result = await db.query(
      'SELECT id, username, email, password_hash, role FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    if (!user.password_hash) {
      console.error('❌ No password_hash for user:', email);
      return res.status(500).json({
        error: 'Account problem. Please re-register your account.'
      });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      console.log('❌ Wrong password for:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful:', user.username, user.role);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};