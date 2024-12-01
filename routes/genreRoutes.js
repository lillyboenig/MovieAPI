const express = require('express');
const router = express.Router();

// Add a new genre
router.post('/', (req, res) => {
    const { name } = req.body;
    res.json({
        message: 'Genre added successfully',
        genre: { name },
    });
});

// Get all genres
router.get('/', (req, res) => {
    res.json({
        message: 'Genres retrieved successfully',
        genres: [
            { genre_id: 1, name: 'Action' },
            { genre_id: 2, name: 'Drama' },
        ],
    });
});

module.exports = router;
