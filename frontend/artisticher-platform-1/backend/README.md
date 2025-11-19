# Artisticher Platform

## Overview
Artisticher is an art marketplace platform that allows users to browse artists, view their profiles, explore artworks, and participate in events. The platform features user authentication, an artists directory, an artwork gallery, and a responsive navigation bar.

## Features
- **User Authentication**: Users can register, log in, and log out. Authentication tokens are stored in localStorage.
- **Artists Directory**: A grid of artist cards that displays artist profiles.
- **Artwork Gallery**: A gallery showcasing all available artworks with options to upload new artworks.
- **Events Page**: A dedicated page for events related to the art marketplace.
- **Responsive Navbar**: A navigation bar that adapts to different screen sizes and shows the user's authentication state.

## Tech Stack
- **Frontend**: React, React Router, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (or any preferred database)
- **Authentication**: JWT (JSON Web Tokens)

## API Endpoints
- **User Authentication**
  - `POST /api/users/register`: Register a new user.
  - `POST /api/users/login`: Log in an existing user.
- **User Operations**
  - `GET /api/users/artists`: Get a list of all artists.
  - `GET /api/users/:id`: Get details of a specific artist.
- **Artwork Operations**
  - `GET /api/artworks`: Get a list of all artworks.
  - `POST /api/artworks`: Upload a new artwork.
- **Event Operations**
  - `GET /api/events`: Get a list of events.

## Getting Started
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```
3. Set up your environment variables in a `.env` file.
4. Start the backend server:
   ```
   npm start
   ```
5. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```
6. Start the frontend application:
   ```
   npm start
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.