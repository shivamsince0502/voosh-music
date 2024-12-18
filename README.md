# Music Streaming API

## Project Overview

This project is a **Music Streaming API** that allows users to manage and access tracks, albums, favorites, and user accounts. It provides endpoints for user authentication, track management, album management, and favorite item management. The API is built using **Node.js** with **Express.js** and supports MongoDB as the database.



## Features

- User authentication (signup, login, logout, password update).
- Admin features for managing users.
- Endpoints for managing tracks, albums, and favorites.
- Role-based access control for protected routes.
- Filter, paginate, and manage visibility of tracks and favorites.

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB atlas, Redis
- **Authentication**: JSON Web Tokens (JWT)

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB ( MongoDB Atlas)
- Redis (cloud)

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/shivamsince0502/voosh-music.git
   cd voosh-music
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and provide the following variables:

   ```env
   PORT=port
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The API will be available at `http://localhost:PORT`.


## API Endpoints

Base URL: `https://voosh-music.onrender.com/voosh-music/`

### User Management
- **POST /signup**: Register a new user
- **POST /login**: Authenticate a user
- **GET /logout**: Logout the current user (Requires auth)
- **GET /users**: Get all users (Admin only)
- **POST /users/add-user**: Admin adds a new user
- **DELETE /users/:email**: Delete a user by email (Admin only)
- **PUT /users/update-password**: Update user's password

### Track Management
- **GET /tracks/all-tracks**: Get all tracks (Requires auth)
- **GET /tracks/:id**: Get track by ID (Requires auth)
- **POST /tracks/add-track**: Add a new track (Requires auth)
- **PUT /tracks/:id**: Update track by ID (Requires auth)
- **DELETE /tracks/:id**: Delete track by ID (Requires auth)

### Album Management
- **GET /album/all-albums**: Get all albums (Requires auth)
- **GET /album/:id**: Get album by ID (Requires auth)
- **POST /album/add-album**: Add a new album (Admin only)
- **PUT /album/:id**: Update album by ID (Admin only)
- **DELETE /album/:id**: Delete album by ID (Admin only)

### Artist Management
- **GET /artists/all-artists**: Get all artists (Requires auth)
- **GET /artists/:id**: Get artist by ID (Requires auth)
- **POST /artists/add-artist**: Add a new artist (Admin only)
- **PUT /artists/:id**: Update artist by ID (Admin only)
- **DELETE /artists/:id**: Delete artist by ID (Admin only)

### Favorites Management
- **GET /favorites/:category**: Get favorites by category (Requires auth)
- **POST /favorites/add-favorite**: Add a favorite (Requires auth)
- **DELETE /favorites/remove-favorite/:id**: Remove a favorite by ID (Requires auth)



## Project Structure

```
├── config
│   ├── db.js            # MongoDB configuration
│   ├── redisdb.js       # Redis configuration
├── controllers
│   ├── albumController.js
│   ├── artistController.js
│   ├── favoriteController.js
│   ├── trackController.js
│   └── userController.js
├── middleware
│   ├── authMiddleware.js
├── models
│   ├── Album.js
│   ├── Artist.js
│   ├── Favorite.js
│   ├── Track.js
│   └── User.js
├── routes
│   ├── albumRoutes.js
│   ├── artistRoutes.js
│   ├── favoriteRoutes.js
│   ├── trackRoutes.js
│   └── userRoutes.js
├── server.js
├── package.json
└── README.md

```

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact

For any inquiries or feedback, please reach out to the repository owner.

