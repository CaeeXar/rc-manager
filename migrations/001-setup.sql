-- Up
CREATE TABLE USER (
    userId TEXT PRIMARY KEY,
    password TEXT
);

INSERT INTO USER (userId, password) 
    VALUES ('Caesar', 'superhash');

-- Down
DROP TABLE USER;