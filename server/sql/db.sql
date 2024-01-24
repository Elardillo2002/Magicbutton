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

CREATE TABLE IF NOT EXISTS words
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    text varchar(255),
    time decimal(5, 2)
);

INSERT INTO words(text, time)
VALUES ('+1', 1.00),
       ('Here', 1.00),
       ('Click me!', 1.00),
       ('Click', 1.00),
       ('I am a big button', 1.00),
       ('I AM THE BIGGEST BUTTON MOTHERFUCKER', 1.00),
       ('Hi', 1.00),
       ('Add one', 1.00),
       ('You are in time', 1.00),
       ('One point', 1.00),
       ('You are great', 1.00),
       ('Come on, push me!', 1.00),
       ('Leviòsa', 1.00),
       ('Leviosá', 1.00),
       ('-1%', 1.00);