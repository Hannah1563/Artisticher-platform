# Artisticher Platform - Backend API

Backend API for the Artisticher art marketplace platform built with Node.js, Express, and MySQL.

## Features

- 🔐 User authentication with JWT
- 🎨 Artwork management and marketplace
- 🛒 Shopping cart and order processing
- 📚 Course creation and enrollment system
- 📅 Event management and registration
- 🔍 Global search functionality
- 📁 Image upload and optimization
- 🔒 Role-based access control
- ⚡ Rate limiting and security

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

5. Create the database:
```bash
mysql -u root -p < database/schema.sql
```

6. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5001`

## API Documentation

See the full API documentation in `API_DOCUMENTATION.md`

## Project Structure

```
backend/
├── config/
│   └── database.js         # Database configuration
├── middleware/
│   └── auth.js            # Authentication middleware
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── users.js           # User management routes
│   ├── artworks.js        # Artwork routes
│   ├── orders.js          # Order management routes
│   ├── courses.js         # Course routes
│   ├── events.js          # Event routes
│   ├── search.js          # Search routes
│   └── upload.js          # File upload routes
├── database/
│   └── schema.sql         # Database schema
├── uploads/               # Uploaded files directory
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── server.js              # Main application file
└── README.md
```

## Environment Variables

```
PORT=5001
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=artisticher_db
JWT_SECRET=your_secret_key
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:3000
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Helmet.js for HTTP headers
- Input validation
- SQL injection protection
- CORS configuration

## Testing

```bash
npm test
```

## License

ISC