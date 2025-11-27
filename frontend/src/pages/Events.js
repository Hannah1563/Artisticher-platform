import React, { useState } from 'react';

const events = [
	{
		title: 'Digital Art Workshop',
		description: 'Hands-on workshop for aspiring digital artists.',
		location: 'Online',
		date: '2025-12-10',
		color: '#a259cf',
		image:
			'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80', // hands painting
		details: [
			'Live digital painting sessions',
			'Q&A with professional artists',
			'Portfolio reviews',
			'Networking opportunities',
		],
	},
	{
		title: 'Summer Art Exhibition',
		description: 'A curated show of contemporary artworks.',
		location: 'Kigali',
		date: '2025-12-20',
		color: '#6e56cf',
		image:
			'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80', // artist at work
		details: [
			'Exhibition of 50+ artworks',
			'Meet the artists',
			'Guided tours',
			'Live music and refreshments',
		],
	},
	{
		title: 'Artisan Craft Fair',
		description: 'A vibrant market of hand-made crafts and local art.',
		location: 'Downtown Kigali',
		date: '2026-04-12',
		color: '#f7b731',
		image:
			'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=600&q=80', // craft market
		details: [
			'Handmade jewelry and pottery',
			'Live craft demonstrations',
			'Meet local artisans',
			'Family-friendly activities',
		],
	},
	{
		title: 'Pottery & Sculpture Day',
		description: 'Explore the world of pottery and sculpture with hands-on demos.',
		location: 'Kigali Arts Center',
		date: '2026-01-22',
		color: '#20bf6b',
		image:
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // pottery
		details: [
			'Pottery wheel demonstrations',
			'Clay sculpting workshops',
			'Sculpture exhibition',
			'Kids’ clay corner',
		],
	},
	{
		title: 'Textile & Weaving Expo',
		description: 'Discover the beauty of textile art and weaving.',
		location: 'Kigali Textile Hub',
		date: '2026-02-18',
		color: '#eb3b5a',
		image:
			'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', // textile/weaving
		details: [
			'Traditional weaving demos',
			'Textile art gallery',
			'Hands-on weaving for all ages',
			'Meet the weavers',
		],
	},
	{
		title: 'Young Artists Meetup',
		description: 'A networking event for emerging artists.',
		location: 'Online',
		date: '2026-02-05',
		color: '#20bf6b',
		image:
			'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', // creative workspace
		details: [
			'Artist introductions',
			'Collaboration sessions',
			'Mentorship opportunities',
		],
	},
	{
		title: 'Annual Art Awards Gala',
		description: 'Celebrating outstanding achievements in art.',
		location: 'Serena Hotel, Kigali',
		date: '2026-03-10',
		color: '#eb3b5a',
		image:
			'https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=600&q=80', // sculpture
		details: [
			'Award ceremony',
			'Red carpet',
			'Performances',
			'Dinner & networking',
		],
	},
];

export default function Events() {
	const [registered, setRegistered] = useState({});

	const handleRegister = (idx) => {
		setRegistered((prev) => ({ ...prev, [idx]: true }));
		// Here you can open a modal, send a request, etc.
		alert("Thank you for registering! You'll receive more info soon.");
	};

	return (
		<div
			style={{
				maxWidth: 700,
				margin: '48px auto',
				padding: '0 16px',
				width: '100%',
			}}
		>
			<h1
				style={{
					fontWeight: 800,
					fontSize: 36,
					marginBottom: 32,
					color: '#222',
				}}
			>
				Events
			</h1>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 28,
					width: '100%',
				}}
			>
				{events.map((event, idx) => (
					<div
						key={idx}
						style={{
							background: '#fff',
							borderRadius: 16,
							boxShadow: '0 4px 24px #a259cf22',
							padding: 0,
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							gap: 12,
							borderLeft: `6px solid ${event.color}`,
							transition: 'box-shadow 0.2s',
							cursor: 'pointer',
							width: '100%',
						}}
						onMouseOver={(e) =>
							(e.currentTarget.style.boxShadow =
								'0 8px 32px #a259cf33')
						}
						onMouseOut={(e) =>
							(e.currentTarget.style.boxShadow =
								'0 4px 24px #a259cf22')
						}
					>
						{event.image && (
							<img
								src={event.image}
								alt={event.title}
								style={{
									width: '100%',
									height: 180,
									objectFit: 'cover',
									borderRadius: '12px 12px 0 0',
									marginBottom: 0,
								}}
							/>
						)}
						<div style={{ padding: 28 }}>
							<div>
								<div
									style={{
										fontSize: 22,
										fontWeight: 700,
										color: '#222',
										marginBottom: 6,
									}}
								>
									{event.title}
								</div>
								<div
									style={{
										color: '#555',
										fontSize: 16,
										marginBottom: 8,
									}}
								>
									{event.description}
								</div>
								<div
									style={{
										color: '#a259cf',
										fontWeight: 600,
										fontSize: 15,
									}}
								>
									<span role="img" aria-label="location">
										📍
									</span>{' '}
									{event.location}
									<span
										style={{
											marginLeft: 18,
											color: '#888',
											fontWeight: 400,
										}}
									>
										<span role="img" aria-label="calendar">
											📅
										</span>{' '}
										{event.date}
									</span>
								</div>
							</div>
							<div style={{ marginTop: 10 }}>
								<div
									style={{
										fontWeight: 600,
										color: '#222',
										marginBottom: 4,
									}}
								>
									What will take place:
								</div>
								<ul
									style={{
										margin: 0,
										paddingLeft: 20,
										color: '#444',
										fontSize: 15,
									}}
								>
									{event.details.map((item, i) => (
										<li
											key={i}
											style={{ marginBottom: 2 }}
										>
											{item}
										</li>
									))}
								</ul>
							</div>
							<button
								style={{
									marginTop: 18,
									alignSelf: 'flex-end',
									background: registered[idx]
										? '#20bf6b'
										: 'linear-gradient(90deg,#a259cf 60%,#6e56cf 100%)',
									color: '#fff',
									border: 'none',
									borderRadius: 8,
									padding: '10px 28px',
									fontWeight: 700,
									fontSize: 16,
									cursor: registered[idx]
										? 'not-allowed'
										: 'pointer',
									opacity: registered[idx] ? 0.7 : 1,
									transition: 'background 0.2s',
								}}
								disabled={registered[idx]}
								onClick={() => handleRegister(idx)}
							>
								{registered[idx] ? 'Registered' : 'Register'}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
