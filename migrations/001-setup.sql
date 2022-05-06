-- Up
CREATE TABLE USER (
    username TEXT PRIMARY KEY,
    password TEXT
);

INSERT INTO USER (username, password) 
    VALUES ('caesar', '$2b$10$eN7nHAYoR2k0goTOBg1KTOojRz.VK4FnMn6x1O6LK3xv1g48jQR.2');
    -- PW: test1234

-- Down
DROP TABLE USER;