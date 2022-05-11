-- Up
CREATE TABLE USERS (
    username TEXT PRIMARY KEY,
    password TEXT
);

CREATE TABLE BUILDS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT REFERENCES USERS,
    title TEXT,
    description TEXT NULL,
    escName TEXT,
    escLink TEXT NULL,
    fcName TEXT,
    fcLink TEXT NULL,
    motorName TEXT,
    motorLink TEXT NULL,
    frameName TEXT,
    frameLink TEXT NULL,
    vtxName TEXT,
    vtxLink TEXT NULL,
    antennaName TEXT,
    antennaLink TEXT NULL,
    cameraName TEXT,
    cameraLink TEXT NULL,
    receiverName TEXT,
    receiverLink TEXT NULL,
    propellerName TEXT,
    propellerLink TEXT NULL,
    modified TEXT
);

CREATE TABLE BATTERIES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT REFERENCES USERS,
    brand TEXT,
    description TEXT NULL,
    capacity NUMBER,
    cells NUMBER,
    link TEXT NULL,
    batteryType TEXT,
    created TEXT,
    modified TEXT
);

INSERT INTO USERS (username, password) 
VALUES ('Caesar', '$2b$10$JeynWsPj5cJMm49.SoVi4O1ifReIRPrUkrW20TFuqKwAKXSPAYNbG');

INSERT INTO BUILDS (
    username,
    title,
    description,
    escName,
    escLink,
    fcName,
    fcLink,
    motorName,
    motorLink,
    frameName,
    frameLink,
    vtxName,
    vtxLink,
    antennaName,
    antennaLink,
    cameraName,
    cameraLink,
    receiverName,
    receiverLink,
    propellerName,
    propellerLink,
    modified
) 
VALUES (
    'Caesar',
    'Apex-Build', 
    'My first self-built 5inch drone. Inspired by Mr. Steele''s build.',
    'Mamba F55 128K',
    'https://www.rctech.de/diatone-mamba-f50pro-50a-4-in-1-esc.html',
    'Mamba Basic F722 APP',
    'https://www.rctech.de/diatone-mamba-f722s-fc-flugsteuerung.html',
    'iFlight Xing2 2306 1755KV',
    'https://n-factory.de/iFlight-Xing2-2306-1755KV-6S-Freestlye-Motor_1',
    'ImpulseRC Apex 5"',
    'https://www.rctech.de/impulserc-apex-5-base-frame-kit-schwarz.html',
    'SpeedyBee TX800',
    'https://www.modell-hubschrauber.at/RC-FPV-Racer-Kameras-Videobrillen-und-co/FPV-Videosender-VTX/Speedy-Bee-TX800-5-8GHZ-Video-Transmitter::54847.html',
    'Lumenier AXII 2',
    'https://n-factory.de/Lumenier-AXII-2-Antennen-Set-SMA_1',
    'RunCam Mr Steele Edition',
    'https://n-factory.de/RunCam-Swift-Mini-2-Mr-Steele-Edition_1',
    'TBS Crossfire',
    'https://www.rctech.de/tbs-crossfire-nano-rx-pro-empfaenger.html',
    'HQProp ETHiX P3',
    'https://n-factory.de/HQProp-ETHiX-P3-51X3X3-Peanut-Butter-Jelly-Prop_1',
    '2022-05-01T12:00:00.307Z'
);

INSERT INTO BATTERIES (
    username,
    brand,
    description,
    capacity,
    cells,
    link,
    batteryType,
    created,
    modified
) 
VALUES (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-02-20T11:00:00.307Z',
    '2022-05-10T10:00:00.307Z'
), (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-02-20T11:00:00.307Z',
    '2022-05-10T10:00:00.307Z'
), (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-02-20T11:00:00.307Z',
    '2022-05-10T10:00:00.307Z'
), (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-04-10T10:00:00.307Z',
    '2022-05-10T10:00:00.307Z'
), (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-04-10T10:00:00.307Z',
    '2022-05-10T10:00:00.307Z'
);

-- Down
DROP TABLE USERS;
DROP TABLE BUILDS;
DROP TABLE BATTERIES;