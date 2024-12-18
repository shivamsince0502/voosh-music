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
- **Database**: MongoDB atlas
- **Authentication**: JSON Web Tokens (JWT)

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14+)
- npm (Node Package Manager)
- MongoDB (local or cloud-based like MongoDB Atlas)

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

### User Management

- **GET BASEURL/logout**: Logout the current user. Possible responses: `200`, `400`.
- **POST BASEURL/signup**: Register a new user. Possible responses: `201`, `400`, `409`.
- **POST BASEURL/login**: Authenticate a user. Possible responses: `200`, `400`, `404`.
- **GET BASEURL/users**: Retrieve all users (Admin only). Possible responses: `200`, `400`, `401`.
- **POST BASEURL/users/add-user**: Admin adds a new user. Possible responses: `201`, `400`, `401`, `403`, `409`.
- **DELETE BASEURL/users/****:id**: Delete a user by ID (Admin only). Possible responses: `200`, `400`, `401`, `403`, `404`.
- **PUT BASEURL/users/update-password**: Update user's password. Possible responses: `204`, `400`, `401`, `403`, `404`.

### Track Management

- **GET BASEURL/tracks**: Retrieve all tracks with filters. Possible responses: `200`, `400`, `401`, `403`, `404`.
- **GET BASEURL/tracks/****:id**: Retrieve a track by ID. Possible responses: `200`, `400`, `401`, `403`, `404`.
- **POST BASEURL/tracks/add-track**: Add a new track. Possible responses: `201`, `400`, `401`, `403`, `404`.
- **PUT BASEURL/tracks/****:id**: Update a track by ID. Possible responses: `204`, `400`, `401`, `403`, `404`.
- **DELETE BASEURL/tracks/****:id**: Delete a track by ID. Possible responses: `200`, `400`, `401`, `403`, `404`.

### Album Management

- **GET BASEURL/albums**: Retrieve all albums. Possible responses: `200`, `400`, `401`, `403`, `404`.
- **GET BASEURL/albums/****:id**: Retrieve an album by ID. Possible responses: `200`, `401`, `403`, `404`.
- **POST BASEURL/albums/add-album**: Add a new album. Possible responses: `201`, `400`, `401`, `403`, `400`.
- **PUT BASEURL/albums/****:id**: Update an album by ID. Possible responses: `204`, `400`, `401`, `403`, `404`.
- **DELETE BASEURL/albums/****:id**: Delete an album by ID. Possible responses: `200`, `400`, `401`, `403`, `404`.

### Artist Management

- **GET BASEURL/artists**: Retrieve all artists. Possible responses: `200`, `400`, `401`.
- **GET BASEURL/artists/****:id**: Retrieve an artist by ID. Possible responses: `200`, `401`, `403`, `404`.
- **POST BASEURL/artists/add-artist**: Add a new artist. Possible responses: `201`, `400`, `401`.
- **PUT BASEURL/artists/****:id**: Update an artist by ID. Possible responses: `204`, `400`, `401`, `403`, `404`.
- **DELETE BASEURL/artists/****:id**: Delete an artist by ID. Possible responses: `200`, `400`, `401`, `403`, `404`.

### Favorites Management

- **GET BASEURL/favorites/****:category**: Retrieve favorites by category. Possible responses: `200`, `400`, `401`, `403`.
- **POST BASEURL/favorites/add-favorite**: Add a favorite item. Possible responses: `201`, `400`, `401`, `403`, `404`.
- **DELETE BASEURL/favorites/remove-favorite/****:id**: Remove a favorite item by ID. Possible responses: `200`, `400`, `401`, `403`, `404`.

## Project Structure

```
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

