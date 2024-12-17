import express from "express";
import pgPool from "./pg_server.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root endpoint
app.get("/customers", (req, res) => {
  res.send("You just called the root endpoint");
});

/* 1. Add new movie genres */
app.post("/genres", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pgPool.query(
      "INSERT INTO Genre (Name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 2. Add new movies */
app.post("/movies", async (req, res) => {
  const { name, year, genreId } = req.body;
  try {
    const result = await pgPool.query(
      "INSERT INTO Movie (name, year, genreid) VALUES ($1, $2, $3) RETURNING *",
      [name, year, genreId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 3. Register new user */
app.post("/customers", async (req, res) => {
  const { name, username, password, yearOfBirth } = req.body;
  try {
    const result = await pgPool.query(
      "INSERT INTO Customer (Name, CustomerName, Password, YearOfBirth) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, username, password, yearOfBirth]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 4. Get movie by ID */
app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pgPool.query("SELECT * FROM Movie WHERE MovieID = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Movie not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 5. Remove movie by ID */
app.delete("/movies/:id", async (req, res) => {
    const { id } = req.params;
    try {
      // Check for dependent records in Review or FavouriteMovie
      const check = await pgPool.query(
        "SELECT * FROM Review WHERE MovieID = $1 UNION SELECT * FROM FavouriteMovie WHERE MovieID = $1",
        [id]
      );
  
      if (check.rows.length > 0) {
        return res
          .status(400)
          .json({ error: "Cannot delete movie because it is bound to reviews or favorites" });
      }
  
      const result = await pgPool.query(
        "DELETE FROM Movie WHERE MovieID = $1 RETURNING *",
        [id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).send("Movie not found");
      }
  
      res.json({ message: "Movie deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

/* 6. Get all movies with pagination */
app.get("/movies", async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const result = await pgPool.query("SELECT * FROM Movie LIMIT $1 OFFSET $2", [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 7. Search movies by keyword */
app.get("/movies/search", async (req, res) => {
  const { keyword } = req.query;
  try {
    const result = await pgPool.query("SELECT * FROM Movie WHERE name ILIKE $1", [`%${keyword}%`]);
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 8. Add movie review */
app.post("/reviews", async (req, res) => {
  const { username, stars, reviewText, movieId } = req.body;
  try {
    const result = await pgPool.query(
      "INSERT INTO Review (CustomerName, Stars, ReviewText, MovieID) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, stars, reviewText, movieId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 9. Add favorite movie */
app.post("/favorites", async (req, res) => {
  const { customerId, movieId } = req.body;
  try {
    const result = await pgPool.query(
      "INSERT INTO FavouriteMovie (CustomerID, MovieID) VALUES ($1, $2) RETURNING *",
      [customerId, movieId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 10. Get favorite movies by username */
app.get("/favorites/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const result = await pgPool.query(
      `SELECT m.* FROM Movie m
       INNER JOIN FavouriteMovie f ON m.MovieID = f.MovieID
       INNER JOIN Customer c ON f.CustomerID = c.CustomerID
       WHERE c.CustomerName = $1`,
      [username]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});