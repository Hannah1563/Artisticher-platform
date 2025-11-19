# Artisticher Platform

Welcome to the Artisticher Platform, an art marketplace where artists can showcase their work, and art enthusiasts can discover and purchase unique artworks. This project is built using React, React Router, and TailwindCSS, providing a modern and responsive user experience.

## Features

- **User Authentication**: Users can register, log in, and log out. Authentication tokens are stored in localStorage for session management.
- **Artists Directory**: Browse through a list of artists, view their profiles, and explore their artworks.
- **Artwork Gallery**: A gallery showcasing all available artworks, with options to filter and search.
- **Events Page**: Stay updated with upcoming events related to the art community.
- **Responsive Navbar**: A navigation bar that adapts to different screen sizes, displaying user state and links to various pages.

## Project Structure

```
artisticher-platform
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── index.js
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── components
│   │   │   ├── Navigation.js
│   │   │   ├── Footer.js
│   │   │   ├── ArtworkCard.js
│   │   │   ├── ArtistCard.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── Hero.js
│   │   ├── pages
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Artists.js
│   │   │   ├── ArtistProfile.js
│   │   │   ├── Gallery.js
│   │   │   ├── AddArtwork.js
│   │   │   └── Events.js
│   │   └── utils
│   │       └── auth.js
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── README.md
└── backend
    ├── server.js
    ├── routes
    │   ├── users.js
    │   ├── artworks.js
    │   └── events.js
    ├── middleware
    │   └── auth.js
    ├── package.json
    └── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A running backend server (see backend/README.md for setup instructions).

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd artisticher-platform/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add your API base URL:
   ```
   REACT_APP_API_URL=http://localhost:5001/api
   ```

4. Start the development server:
   ```
   npm start
   ```

### Usage

- Navigate to `http://localhost:3000` in your browser to access the application.
- Use the navigation bar to explore different sections of the platform.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.