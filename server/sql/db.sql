DROP DATABASE magicbutton;

CREATE DATABASE IF NOT EXISTS magicbutton;
USE magicbutton;

CREATE TABLE IF NOT EXISTS player
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS points
(
    player INT PRIMARY KEY,
    points INT,
    FOREIGN KEY (player) REFERENCES player (id)
);
