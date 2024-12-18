const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes'); 
const albumRoutes = require('./routes/albumRoutes');
const tractRoutes = require('./routes/trackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const mongoose = require('mongoose');
const { base } = require('./models/User');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('DB Connection Error:', err));

base_url = '/voosh-music'

app.use(base_url, userRoutes);
app.use(base_url, artistRoutes);  // artistRoutes.js
app.use(base_url, albumRoutes);   // albumRoutes.js
app.use(base_url, tractRoutes);   // trackRoutes.js (fix typo)
app.use(base_url, favoriteRoutes); // favoriteRoutes.js



// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
