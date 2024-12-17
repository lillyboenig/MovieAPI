-- Active: 1730642311714@@127.0.0.1@5432@postgres@public
CREATE TABLE customer (
    customerid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    year_of_birth INT NOT NULL,
    customername VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE genre (
    genreid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE movie (
    movieid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    year INT NOT NULL,
    genreid INT NOT NULL REFERENCES genre(genreid)
);

CREATE TABLE review (
    reviewid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customername VARCHAR(50) NOT NULL REFERENCES customer(customername),
    movieid INT NOT NULL REFERENCES movie(movieid),
    stars INT NOT NULL CHECK (stars >= 1 AND stars <= 5),
    reviewtext TEXT
);

CREATE TABLE favouritemovie (
    favouriteid INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customerid INT NOT NULL REFERENCES customer(customerid),
    movieid INT NOT NULL REFERENCES movie(movieid)
);
