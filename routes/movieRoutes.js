const db = require('../db');

router.post('/', (req, res) => {
    const { name, year, genre_id } = req.body;
    const sql = 'INSERT INTO Movie (name, year, genre_id) VALUES (?, ?, ?)';

    db.query(sql, [name, year, genre_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(201).json({
            message: 'Movie added successfully',
            movie_id: result.insertId,
        });
    });
});

router.get('/', (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const sql = 'SELECT * FROM Movie LIMIT ? OFFSET ?';
    db.query(sql, [limit, offset], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json({
            message: 'Movies retrieved successfully',
            movies: results,
            page: parseInt(page),
        });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Movie WHERE movie_id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({
            message: 'Movie retrieved successfully',
            movie: result[0],
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Movie WHERE movie_id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({
            message: `Movie with ID ${id} deleted successfully`,
        });
    });
});
