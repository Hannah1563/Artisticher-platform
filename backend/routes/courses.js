const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { level, search, minPrice, maxPrice, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT 
        c.id,
        c.instructor_id,
        u.username as instructor_name,
        c.title,
        c.description,
        c.price,
        c.level,
        c.duration,
        c.image_url,
        c.created_at,
        (SELECT COUNT(*) FROM course_enrollments WHERE course_id = c.id) as enrollment_count
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (level) {
      query += ' AND c.level = ?';
      params.push(level);
    }

    if (search) {
      query += ' AND (c.title LIKE ? OR c.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (minPrice) {
      query += ' AND c.price >= ?';
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND c.price <= ?';
      params.push(maxPrice);
    }

    query += ' ORDER BY c.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [courses] = await db.query(query, params);
    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [courses] = await db.query(`
      SELECT 
        c.id,
        c.instructor_id,
        u.username as instructor_name,
        u.profile_image as instructor_image,
        u.bio as instructor_bio,
        c.title,
        c.description,
        c.price,
        c.level,
        c.duration,
        c.image_url,
        c.syllabus,
        c.requirements,
        c.created_at,
        (SELECT COUNT(*) FROM course_enrollments WHERE course_id = c.id) as enrollment_count
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE c.id = ?
    `, [id]);

    if (courses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const course = courses[0];
    if (course.syllabus) {
      course.syllabus = JSON.parse(course.syllabus);
    }
    if (course.requirements) {
      course.requirements = JSON.parse(course.requirements);
    }

    res.json(course);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create course
router.post('/', auth, [
  body('title').trim().isLength({ min: 3, max: 255 }).withMessage('Title must be 3-255 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('level').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid level'),
  body('duration').notEmpty().withMessage('Duration is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, price, level, duration, image_url, syllabus, requirements } = req.body;
    const instructorId = req.user.userId;

    const [result] = await db.query(
      'INSERT INTO courses (instructor_id, title, description, price, level, duration, image_url, syllabus, requirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [instructorId, title, description, price, level, duration, image_url, 
       JSON.stringify(syllabus), JSON.stringify(requirements)]
    );

    res.status(201).json({
      message: 'Course created successfully',
      course: {
        id: result.insertId,
        instructor_id: instructorId,
        title,
        description,
        price,
        level,
        duration,
        image_url
      }
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if course exists
    const [courses] = await db.query('SELECT id, price FROM courses WHERE id = ?', [id]);
    if (courses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const [existing] = await db.query(
      'SELECT id FROM course_enrollments WHERE user_id = ? AND course_id = ?',
      [userId, id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Enroll user
    const [result] = await db.query(
      'INSERT INTO course_enrollments (user_id, course_id, enrolled_at) VALUES (?, ?, NOW())',
      [userId, id]
    );

    res.status(201).json({
      message: 'Successfully enrolled in course',
      enrollment: {
        id: result.insertId,
        user_id: userId,
        course_id: id,
        enrolled_at: new Date()
      }
    });
  } catch (error) {
    console.error('Enroll course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user enrollments
router.get('/enrollments', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [enrollments] = await db.query(`
      SELECT 
        ce.id,
        ce.enrolled_at,
        ce.progress,
        c.id as course_id,
        c.title,
        c.description,
        c.price,
        c.level,
        c.duration,
        c.image_url,
        u.username as instructor_name
      FROM course_enrollments ce
      JOIN courses c ON ce.course_id = c.id
      JOIN users u ON c.instructor_id = u.id
      WHERE ce.user_id = ?
      ORDER BY ce.enrolled_at DESC
    `, [userId]);

    res.json(enrollments);
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;