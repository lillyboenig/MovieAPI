

-- Table: Customer
CREATE TABLE Customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    Customer_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    year_of_birth YEAR NOT NULL
);

-- Table: Genre
CREATE TABLE Genre (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: Movie
CREATE TABLE Movie (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    year YEAR NOT NULL,
    genre_id INT NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
);

-- Table: Review
CREATE TABLE Review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    movie_id INT NOT NULL,
    stars INT NOT NULL CHECK (stars >= 1 AND stars <= 5),
    review_text TEXT,
    FOREIGN KEY (Customer_name) REFERENCES User(Customer_name),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
);

-- Table: FavoriteMovies
CREATE TABLE FavoriteMovies (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (Customer_id) REFERENCES User(Customer_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
);
