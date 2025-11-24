const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { auth } = require('../middleware/auth');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', auth, courseController.createCourse);
router.put('/:id', auth, courseController.updateCourse);
router.delete('/:id', auth, courseController.deleteCourse);
router.post('/:id/enroll', auth, courseController.enrollInCourse);
router.get('/my-enrollments', auth, courseController.getUserEnrollments);

module.exports = router;