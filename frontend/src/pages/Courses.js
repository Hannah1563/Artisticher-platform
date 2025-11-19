import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Courses() {
  // Sample courses data (will come from backend later)
  const [courses] = useState([
    {
      id: 1,
      title: 'Beginner Oil Painting',
      instructor: 'Sarah Johnson',
      description: 'Learn the fundamentals of oil painting from scratch. Perfect for beginners who want to start their artistic journey.',
      price: 49.99,
      duration: '6 weeks',
      level: 'Beginner',
      students: 1250,
      rating: 4.8,
      image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500'
    },
    {
      id: 2,
      title: 'Digital Art Masterclass',
      instructor: 'Mike Chen',
      description: 'Master digital art techniques using Photoshop and Procreate. Learn from industry professionals.',
      price: 79.99,
      duration: '8 weeks',
      level: 'Intermediate',
      students: 2100,
      rating: 4.9,
      image_url: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=500'
    },
    {
      id: 3,
      title: 'Watercolor Techniques',
      instructor: 'Emily Brown',
      description: 'Explore beautiful watercolor techniques and create stunning paintings with confidence.',
      price: 39.99,
      duration: '4 weeks',
      level: 'Beginner',
      students: 890,
      rating: 4.7,
      image_url: 'https://images.unsplash.com/photo-1579762593131-f3c6c960b87d?w=500'
    },
    {
      id: 4,
      title: 'Portrait Drawing Fundamentals',
      instructor: 'David Martinez',
      description: 'Master the art of drawing realistic portraits. Learn anatomy, proportions, and shading.',
      price: 59.99,
      duration: '6 weeks',
      level: 'Intermediate',
      students: 1650,
      rating: 4.8,
      image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500'
    },
    {
      id: 5,
      title: 'Abstract Art Expression',
      instructor: 'Lisa Anderson',
      description: 'Discover your unique style through abstract art. Express emotions through colors and forms.',
      price: 44.99,
      duration: '5 weeks',
      level: 'All Levels',
      students: 780,
      rating: 4.6,
      image_url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=500'
    },
    {
      id: 6,
      title: 'Art Business & Marketing',
      instructor: 'Robert Kim',
      description: 'Learn how to market your art, build your brand, and turn your passion into a profitable business.',
      price: 69.99,
      duration: '6 weeks',
      level: 'All Levels',
      students: 1320,
      rating: 4.9,
      image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Learn Art & Improve Your Skills</h1>
        <p className="text-xl text-gray-600">
          Join thousands of students learning from expert artists
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <button className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700">
          All Courses
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300">
          Beginner
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300">
          Intermediate
        </button>
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300">
          Advanced
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img 
              src={course.image_url}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
                <div className="flex items-center text-yellow-500">
                  <span className="mr-1">⭐</span>
                  <span className="font-semibold">{course.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-2">by {course.instructor}</p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>⏱️ {course.duration}</span>
                <span>👥 {course.students.toLocaleString()} students</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">
                  ${course.price}
                </span>
                <Link 
                  to={`/courses/${course.id}`}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-medium"
                >
                  View Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Learn Section */}
      <div className="mt-16 bg-purple-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Learn With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">👨‍🎨</div>
            <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from professional artists with years of experience
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-2">Flexible Learning</h3>
            <p className="text-gray-600">
              Study at your own pace with lifetime access to courses
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Certificates</h3>
            <p className="text-gray-600">
              Earn certificates upon completion to showcase your skills
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;