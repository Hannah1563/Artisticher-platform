const db = require('../config/db');

// Get all artworks
exports.getAllArtworks = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
         id,
         title,
         description,
         image_url,
         price,
         user_id,        -- replace artist_id with your real FK column
         created_at
       FROM artworks
       ORDER BY created_at DESC`
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
    const { title, description, price, image_url, category } = req.body;
    const userId = req.user.userId;

    // Validate price
    if (parseFloat(price) > 50000) {
      return res.status(400).json({ error: 'Price cannot exceed 50,000 RWF' });
    }

    const result = await db.query(
      `INSERT INTO artworks (title, description, price, image_url, user_id, category)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, price, image_url, userId, category]
    );

    res.status(201).json({
      message: 'Artwork created successfully',
      artwork: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).json({ error: 'Failed to create artwork' });
  }
};

// Update artwork
exports.updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image_url, category } = req.body;
    const userId = req.user.userId;

    // Validate price
    if (price && parseFloat(price) > 50000) {
      return res.status(400).json({ error: 'Price cannot exceed 50,000 RWF' });
    }

    const result = await db.query(
      `UPDATE artworks 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           image_url = COALESCE($4, image_url),
           category = COALESCE($5, category),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [title, description, price, image_url, category, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found or unauthorized' });
    }

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