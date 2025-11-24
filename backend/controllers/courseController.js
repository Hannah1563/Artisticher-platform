const db = require('../config/db');

exports.getAllCourses = async (req, res) => {
  try {
    const { level, search, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT 
        c.*, u.username as instructor_name, u.profile_image as instructor_image
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (level) {
      paramCount++;
      query += ` AND c.level = $${paramCount}`;
      params.push(level);
    }

    if (search) {
      paramCount++;
      query += ` AND (c.title ILIKE $${paramCount} OR c.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY c.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(`
      SELECT 
        c.*, u.username as instructor_name, u.profile_image as instructor_image, u.bio as instructor_bio
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE c.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, duration, level, image_url, syllabus, requirements } = req.body;
    const instructorId = req.user.userId;

    if (!title || !description || !price || !level || !duration) {
      return res.status(400).json({ message: 'Title, description, price, level, and duration are required' });
    }

    const result = await db.query(
      'INSERT INTO courses (instructor_id, title, description, price, duration, level, image_url, syllabus, requirements) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [instructorId, title, description, price, duration, level, image_url, syllabus, requirements]
    );

    res.status(201).json({
      message: 'Course created successfully',
      course: result.rows[0]
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, duration, level, image_url, syllabus, requirements } = req.body;
    const instructorId = req.user.userId;

    // Check ownership
    const course = await db.query('SELECT instructor_id FROM courses WHERE id = $1', [id]);
    if (course.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (course.rows[0].instructor_id !== instructorId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const result = await db.query(
      'UPDATE courses SET title = $1, description = $2, price = $3, duration = $4, level = $5, image_url = $6, syllabus = $7, requirements = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING *',
      [title, description, price, duration, level, image_url, syllabus, requirements, id]
    );

    res.json({
      message: 'Course updated successfully',
      course: result.rows[0]
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user.userId;

    // Check ownership
    const course = await db.query('SELECT instructor_id FROM courses WHERE id = $1', [id]);
    if (course.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (course.rows[0].instructor_id !== instructorId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await db.query('DELETE FROM courses WHERE id = $1', [id]);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Simplified - no enrollments for now
exports.enrollInCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    res.json({
      message: 'Enrollment received',
      course_id: id,
      user_id: userId
    });
  } catch (error) {
    console.error('Enroll course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserEnrollments = async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};