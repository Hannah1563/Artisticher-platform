const db = require('../config/db');

// Get all artworks
exports.getAllArtworks = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
         a.id,
         a.title,
         a.description,
         a.image_url,
         a.price,
         a.user_id,
         a.created_at,
         u.username AS artist_name,
         u.email AS artist_email
       FROM artworks a
       JOIN users u ON a.user_id = u.id
       ORDER BY a.created_at DESC`
    );

    const artworks = result.rows || [];
    res.json({ success: true, artworks });
  } catch (err) {
    console.error('❌ Error fetching artworks:', err);
    res.status(500).json({ success: false, error: 'Failed to load artworks' });
  }
};

// Get single artwork
exports.getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT a.*, u.username as artist_name, u.email as artist_email
      FROM artworks a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json({ artwork: result.rows[0] });
  } catch (error) {
    console.error('Error fetching artwork:', error);
    res.status(500).json({ error: 'Failed to fetch artwork' });
  }
};

// Create artwork (artists only)
exports.createArtwork = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const userId = req.user.id;

    if (req.user.role !== 'artist') {
      return res.status(403).json({ error: 'Only artists can add artworks.' });
    }

    // Validate required fields
    if (!title || !description || !price || !req.file) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Parse and validate price
    if (isNaN(price) || Number(price) <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number.' });
    }

    const image_url = `/uploads/${req.file.filename}`;

    const result = await db.query(
      `INSERT INTO artworks (title, description, image_url, price, user_id, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, title, description, image_url, price, user_id, created_at`,
      [title, description, image_url, price, userId]
    );

    res.status(201).json({ success: true, artwork: result.rows[0] });
  } catch (err) {
    console.error('❌ Error creating artwork:', err);
    res.status(500).json({ success: false, error: 'Failed to create artwork' });
  }
};

// Update artwork
exports.updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image_url, category } = req.body;
    const userId = req.user.id;

    // Validate price
    if (price && parseFloat(price) > 50000) {
      return res.status(400).json({ error: 'Price cannot exceed 50,000 RWF' });
    }

    // Only allow the owner to update
    const check = await db.query('SELECT user_id FROM artworks WHERE id = $1', [id]);
    if (!check.rows.length) return res.status(404).json({ error: 'Artwork not found' });
    if (check.rows[0].user_id !== userId) return res.status(403).json({ error: 'Not allowed' });

    const result = await db.query(
      `UPDATE artworks 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           image_url = COALESCE($4, image_url),
           category = COALESCE($5, category),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [title, description, price, image_url, category, id]
    );

    res.json({
      message: 'Artwork updated successfully',
      artwork: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating artwork:', error);
    res.status(500).json({ error: 'Failed to update artwork' });
  }
};

// Delete artwork
exports.deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await db.query(
      'DELETE FROM artworks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found or unauthorized' });
    }

    res.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    res.status(500).json({ error: 'Failed to delete artwork' });
  }
};

// Get artworks by user
exports.getMyArtworks = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await db.query(
      `SELECT a.*, u.username AS artist_name, u.email AS artist_email
       FROM artworks a
       JOIN users u ON a.user_id = u.id
       WHERE a.user_id = $1
       ORDER BY a.created_at DESC`,
      [userId]
    );
    res.json({ success: true, artworks: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your artworks' });
  }
};