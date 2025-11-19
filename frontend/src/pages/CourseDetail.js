import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CourseDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);

  // Sample course data (will come from backend later)
  const [course] = useState({
    id: 1,
    title: 'Beginner Oil Painting',
    instructor: 'Sarah Johnson',
    instructorBio: 'Professional artist with 15+ years of experience. Featured in major galleries worldwide.',
    description: 'Learn the fundamentals of oil painting from scratch. Perfect for beginners who want to start their artistic journey.',
    fullDescription: 'This comprehensive course will take you through everything you need to know about oil painting. You\'ll learn about materials, techniques, color theory, and composition. By the end of this course, you\'ll have created several beautiful paintings and gained the confidence to continue your artistic journey.',
    price: 49.99,
    duration: '6 weeks',
    level: 'Beginner',
    students: 1250,
    rating: 4.8,
    totalRatings: 450,
    image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500',
    lessons: [
      { id: 1, title: 'Introduction to Oil Painting', duration: '15 min' },
      { id: 2, title: 'Essential Materials & Tools', duration: '20 min' },
      { id: 3, title: 'Color Theory Basics', duration: '25 min' },
      { id: 4, title: 'Brush Techniques', duration: '30 min' },
      { id: 5, title: 'Your First Painting - Still Life', duration: '45 min' },
      { id: 6, title: 'Understanding Light & Shadow', duration: '35 min' },
      { id: 7, title: 'Landscape Painting Basics', duration: '40 min' },
      { id: 8, title: 'Final Project & Review', duration: '50 min' }
    ],
    whatYouLearn: [
      'Master fundamental oil painting techniques',
      'Understand color theory and mixing',
      'Create beautiful still life paintings',
      'Learn proper brush handling',
      'Develop your artistic style',
      'Complete 5+ finished paintings'
    ],
    requirements: [
      'No prior art experience needed',
      'Basic art supplies (list provided)',
      'Willingness to practice and experiment'
    ]
  });

  useEffect(() => {
    // Check if user is enrolled (from localStorage for now)
    if (user) {
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const isEnrolled = enrollments.some(e => e.courseId === parseInt(id) && e.userId === user.userId);
      setEnrolled(isEnrolled);
    }
  }, [user, id]);

  const handleEnroll = () => {
    if (!user) {
      alert('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    // Save enrollment (will be saved to backend later)
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    enrollments.push({
      userId: user.userId,
      courseId: parseInt(id),
      enrolledDate: new Date().toISOString()
    });
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    setEnrolled(true);
    alert('Successfully enrolled! 🎉');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              {course.level}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-gray-700 mb-4">{course.description}</p>
          
          <div className="flex items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <span className="mr-2">⭐</span>
              <span className="font-semibold">{course.rating}</span>
              <span className="ml-1">({course.totalRatings} ratings)</span>
            </div>
            <div>👥 {course.students.toLocaleString()} students</div>
            <div>⏱️ {course.duration}</div>
          </div>

          <div className="flex items-center gap-4">
            <img 
              src="https://via.placeholder.com/50"
              alt={course.instructor}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{course.instructor}</p>
              <p className="text-sm text-gray-600">Course Instructor</p>
            </div>
          </div>
        </div>

        {/* Enrollment Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-24">
            <img 
              src={course.image_url}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-4">
                ${course.price}
              </div>
              
              {enrolled ? (
                <button
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold mb-3 cursor-not-allowed"
                  disabled
                >
                  ✓ Enrolled
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 mb-3"
                >
                  Enroll Now
                </button>
              )}

              <div className="text-center text-sm text-gray-600 mb-4">
                30-day money-back guarantee
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lessons:</span>
                  <span className="font-semibold">{course.lessons.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-semibold">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* What You'll Learn */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.whatYouLearn.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <span className="text-purple-600 font-semibold mr-4">
                      {index + 1}
                    </span>
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-gray-600 text-sm">{lesson.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">About This Course</h2>
            <p className="text-gray-700 whitespace-pre-line">{course.fullDescription}</p>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <ul className="space-y-2">
              {course.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructor */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Instructor</h2>
            <div className="flex items-start gap-4">
              <img 
                src="https://via.placeholder.com/100"
                alt={course.instructor}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                <p className="text-gray-700">{course.instructorBio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;