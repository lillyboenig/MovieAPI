const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const movieRoutes = require('./routes/movieRoutes');
const genreRoutes = require('./routes/genreRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

// Use routes
app.use('/movies', movieRoutes);
app.use('/genres', genreRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/favorites', favoriteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
