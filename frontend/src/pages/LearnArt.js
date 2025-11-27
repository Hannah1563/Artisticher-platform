import React from 'react';
import { useTranslation } from 'react-i18next';

const courses = [
	{
		title: 'Beginner Oil Painting',
		description:
			'Learn the fundamentals of oil painting from scratch. Perfect for beginners who want to start their artistic journey.',
		instructor: 'Sarah Johnson',
		duration: '6 weeks',
		lessons: 8,
		level: 'Beginner',
		certificate: true,
		price: '$49.99',
		image:
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // Oil painting
		rating: 4.8,
		students: 1250,
		reviews: 450,
		link: '#',
	},
	{
		title: 'Digital Art Essentials',
		description:
			'Master the basics of digital art using free tools and software. Includes hands-on projects.',
		instructor: 'Eric Niyonzima',
		duration: '4 weeks',
		lessons: 6,
		level: 'All Levels',
		certificate: true,
		price: '$39.99',
		image:
			'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80', // Digital art
		rating: 4.7,
		students: 980,
		reviews: 320,
		link: '#',
	},
];

const lessons = [
	{
		title: 'Introduction to Drawing',
		description: 'Learn the basics of sketching and shading.',
		videoUrl: 'https://www.youtube.com/embed/2UphAzryVpY',
	},
	{
		title: 'Painting with Watercolors',
		description: 'A beginner\'s guide to watercolor techniques.',
		videoUrl: 'https://www.youtube.com/embed/1v8p3bGqQnA',
	},
	{
		title: 'Digital Art for Beginners',
		description: 'Start creating digital art using free tools.',
		videoUrl: 'https://www.youtube.com/embed/3uEtdDvK6Xo',
	},
];

const LearnArt = () => {
	const { t } = useTranslation();

	return (
		<div>
			{/* Top Banner */}
			<section
				style={{
					background:
						'linear-gradient(90deg, #a259cf 0%, #f7b801 100%)',
					color: '#fff',
					padding: '48px 0 32px 0',
					textAlign: 'center',
					marginBottom: '32px',
					borderRadius: '0 0 32px 32px',
					boxShadow: '0 2px 16px #e0e0e0',
				}}
			>
				<h1
					style={{
						fontSize: '2.5rem',
						fontWeight: 700,
						marginBottom: '0.5rem',
					}}
				>
					{t('learnArt') || 'Learn Art'}
				</h1>
				<p style={{ fontSize: '1.2rem', opacity: 0.92 }}>
					{t('learnArt.subtitle') ||
						'Find resources and tutorials to improve your art skills.'}
				</p>
			</section>

			{/* Courses Section */}
			<section
				style={{
					maxWidth: 1200,
					margin: '0 auto',
					padding: '24px 0',
				}}
			>
				<h2
					style={{
						fontSize: '2rem',
						fontWeight: 700,
						marginBottom: '1.5rem',
						color: '#a259cf',
					}}
				>
					Courses
				</h2>
				<div
					style={{
						display: 'flex',
						gap: '32px',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}
				>
					{courses.map((course, idx) => (
						<div
							key={idx}
							style={{
								background: '#fff',
								borderRadius: '16px',
								boxShadow: '0 2px 16px #e0e0e0',
								width: 370,
								marginBottom: 32,
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<img
								src={course.image}
								alt={course.title}
								style={{
									width: '100%',
									height: 160,
									objectFit: 'cover',
								}}
							/>
							<div style={{ padding: 24, flex: 1 }}>
								<h3
									style={{
										fontWeight: 700,
										fontSize: '1.3rem',
										marginBottom: 8,
									}}
								>
									{course.title}
								</h3>
								<p
									style={{
										color: '#555',
										marginBottom: 12,
									}}
								>
									{course.description}
								</p>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										fontSize: '0.95rem',
										marginBottom: 8,
										gap: 12,
									}}
								>
									<span role="img" aria-label="star">
										⭐
									</span>
									<span>
										{course.rating} ({course.reviews} ratings)
									</span>
									<span role="img" aria-label="students">
										👩‍🎨
									</span>
									<span>{course.students} students</span>
									<span role="img" aria-label="duration">
										⏱️
									</span>
									<span>{course.duration}</span>
								</div>
								<div
									style={{
										fontSize: '0.95rem',
										marginBottom: 8,
									}}
								>
									<strong>Instructor:</strong> {course.instructor}
								</div>
								<div
									style={{
										fontSize: '0.95rem',
										marginBottom: 8,
									}}
								>
									<strong>Lessons:</strong> {course.lessons} &nbsp;|&nbsp;
									<strong>Level:</strong> {course.level} &nbsp;|&nbsp;
									<strong>Certificate:</strong>{' '}
									{course.certificate ? 'Yes' : 'No'}
								</div>
								<div
									style={{
										fontWeight: 700,
										color: '#a259cf',
										fontSize: '1.2rem',
										margin: '12px 0',
									}}
								>
									{course.price}
								</div>
								<a
									href={course.link}
									style={{
										display: 'inline-block',
										background: '#a259cf',
										color: '#fff',
										borderRadius: '8px',
										padding: '10px 28px',
										fontWeight: 600,
										fontSize: '1rem',
										textDecoration: 'none',
										marginTop: 8,
									}}
								>
									Enroll Now
								</a>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Video Lessons Section */}
			<section
				style={{
					maxWidth: 1200,
					margin: '0 auto',
					padding: '24px 0',
				}}
			>
				<h2
					style={{
						fontSize: '2rem',
						fontWeight: 700,
						marginBottom: '1.5rem',
						color: '#a259cf',
					}}
				>
					Video Tutorials
				</h2>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '2rem',
						marginTop: '2rem',
						justifyContent: 'center',
					}}
				>
					{lessons.map((lesson, idx) => (
						<div
							key={idx}
							style={{
								flex: '1 1 300px',
								background: '#fff',
								borderRadius: '8px',
								boxShadow: '0 2px 8px #eee',
								padding: '1rem',
								maxWidth: 400,
							}}
						>
							<h3
								style={{
									fontSize: '1.1rem',
									marginBottom: '0.5rem',
								}}
							>
								{lesson.title}
							</h3>
							<p>{lesson.description}</p>
							<div style={{ marginTop: '1rem' }}>
								<iframe
									width="100%"
									height="180"
									src={lesson.videoUrl}
									title={lesson.title}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default LearnArt;