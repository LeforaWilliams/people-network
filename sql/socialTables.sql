DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(168) NOT NULL,
    surname VARCHAR(168) NOT NULL,
    email VARCHAR(168) NOT NULL UNIQUE,
    password VARCHAR(168) NOT NULL,
    imageUrl TEXT,
    bio VARCHAR(1608)

);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL  REFERENCES users(id),
    sender_id INT NOT NULL REFERENCES users(id),
    status VARCHAR(168) NOT NULL DEFAULT 'pending'

);
