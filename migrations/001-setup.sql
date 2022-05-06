-- Up
CREATE TABLE USER (
    username TEXT PRIMARY KEY,
    password TEXT
);

INSERT INTO USER (username, password) 
    VALUES ('caesar', '$2b$10$JeynWsPj5cJMm49.SoVi4O1ifReIRPrUkrW20TFuqKwAKXSPAYNbG');
    -- PW: test1234

-- Down
DROP TABLE USER;