# Artisticher-platform
For my platform

A full-stack web platform connecting artists with art enthusiasts. Artists can showcase their work, manage profiles, and sell their creations. Users can discover art, attend events, and purchase artworks.

**Built with:** Node.js, Express, PostgreSQL, React, and Tailwind CSS.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 🎭 **Artist Profiles** - Showcase artist portfolios with bio, location, and artworks
- 🖼️ **Artwork Gallery** - Browse and purchase artworks
- 📅 **Events Management** - Discover and register for art exhibitions and workshops
- 🔐 **Authentication** - Secure user registration and login with JWT
- 🌍 **Multi-language Support** - English, French, Kinyarwanda, and Swahili
- 💳 **E-commerce** - Shopping cart and order management
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Tailwind CSS
- i18next (internationalization)
- Axios

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt.js

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Hannah1563/Artisticher-platform.git
cd Artisticher-platform
```

---

## 🖥️ Backend Setup

### Step 1: Navigate to Backend Folder
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment Variables

Create a `.env` file in the `backend` folder:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/artisticher

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

**Replace:**
- `username` - your PostgreSQL username (e.g., `postgres`)
- `password` - your PostgreSQL password
- `artisticher` - your database name
- `your_super_secret_jwt_key_here` - generate a strong secret key

### Step 4: Set Up the Database

**Option A: Create Database and Import Backup**
```bash
# Create database
createdb artisticher

# Import the backup SQL file
psql -U postgres -d artisticher -f artisticher_backup.sql
```

**Option B: Manual Setup**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE artisticher;

# Connect to the database
\c artisticher

# Run your SQL schema file
\i artisticher_backup.sql

# Exit
\q
```

### Step 5: Start the Backend Server
```bash
npm start
```

✅ **Backend is now running at:** `http://localhost:5001`

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Folder

Open a **new terminal window** and run:
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

If you encounter peer dependency issues:
```bash
npm install --legacy-peer-deps
```

### Step 3: Create Environment Variables (Optional)

Create a `.env` file in the `frontend` folder:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### Step 4: Start the Frontend Server
```bash
npm start
```

✅ **Frontend is now running at:** `http://localhost:3000`

---

## 🌐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/artisticher` |
| `JWT_SECRET` | Secret key for JWT tokens | `mySecretKey123!` |
| `PORT` | Backend server port | `5001` |
| `CORS_ORIGIN` | Frontend URL for CORS | `http://localhost:3000` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5001/api` |

---

## 🗄️ Database Setup

### Database Schema

The database includes the following main tables:

- **users** - User accounts (artists and buyers)
- **artworks** - Artwork listings
- **events** - Art events and workshops
- **orders** - Purchase orders
- **cart_items** - Shopping cart

### Sample Data

The `artisticher_backup.sql` file includes:
- 3 sample artists
- 3 sample artworks
- 2 sample events

### Test Credentials

After importing the backup:

**Artist Account:**
- Email: `artist1@example.com`
- Password: `test1234`

**User Account:**
- Email: `htuyishimireishimwe@gmail.com`
- Password: `test1234`

---

## ▶️ Running the Application

1. **Start PostgreSQL** (if not running):
```bash
   # macOS (Homebrew)
   brew services start postgresql
   
   # Linux
   sudo service postgresql start
   
   # Windows
   # Start from Services or pgAdmin
```

2. **Start Backend** (Terminal 1):
```bash
   cd backend
   npm start
```

3. **Start Frontend** (Terminal 2):
```bash
   cd frontend
   npm start
```

4. **Open Browser:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001`

---

## 📁 Project Structure
```
Artisticher-platform/
│
├── backend/
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth & validation
│   │   └── config/          # Database config
│   ├── artisticher_backup.sql
│   ├── package.json
│   ├── server.js
│   └── .env                 # ⚠️ Create this file
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/      # React components
    │   ├── pages/           # Page components
    │   ├── services/        # API calls
    │   ├── i18n.js          # Translations
    │   ├── App.js
    │   └── index.js
    ├── package.json
    ├── tailwind.config.js
    └── .env                 # ⚠️ Optional
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

### Artworks
- `GET /api/artworks` - Get all artworks
- `GET /api/artworks/:id` - Get artwork by ID
- `POST /api/artworks` - Create artwork (auth required)
- `PUT /api/artworks/:id` - Update artwork (auth required)
- `DELETE /api/artworks/:id` - Delete artwork (auth required)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (auth required)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders

---

## 🐛 Troubleshooting

### Common Issues

**❌ "Cannot connect to PostgreSQL"**
```bash
# Check if PostgreSQL is running
psql -U postgres

# If not running, start it:
brew services start postgresql  # macOS
sudo service postgresql start   # Linux
```

**❌ "Port 5001 already in use"**
```bash
# Find and kill the process
lsof -i :5001
kill -9 <PID>

# Or change PORT in .env
```

**❌ "Module not found" errors**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**❌ Frontend can't connect to backend**
- Make sure backend is running on `http://localhost:5001`
- Check `REACT_APP_API_URL` in frontend `.env`
- Verify CORS settings in backend `.env`

**❌ Database authentication failed**
- Check `DATABASE_URL` credentials in `.env`
- Verify PostgreSQL username and password
- Ensure database `artisticher` exists

---

## 📝 Development Scripts

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (if configured)
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👥 Team

- **Hannah Tuyishimire** - Full Stack Developer

---

## 📧 Contact

For questions or support:
- Email: htuyishimireishimwe@gmail.com
- GitHub: [@Hannah1563](https://github.com/Hannah1563)
- Link to SRS document:  https://docs.google.com/document/d/11bplQ1yX-yMF53ovS_Y2YIE80bhr2AUmG7CfS6xPZmk/edit?usp=sharing
- Link to demo video: https://youtu.be/Vudj1vLWHVY?si=gWJtIOJwb7iX_Uvu
- link to live serers:
                      artisticher-backend:   https://artisticher-backend.onrender.com
                      artisticher-frontend:   https://artisticher-frontend.onrender.com
  [![Watch the video](https://img.youtube.com/vi/Vudj1vLWHVY/0.jpg)](https://www.youtube.com/watch?v=Vudj1vLWHVY)

---

## 📄 License


---

## 🙏 Acknowledgments

- African Leadership University
- Introduction to Software Engineering Course

---

**Made with ❤️ in Kigali, Rwanda**
