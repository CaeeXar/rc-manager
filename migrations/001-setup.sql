-- Up
CREATE TABLE IF NOT EXISTS USERS (
    username TEXT PRIMARY KEY,
    password TEXT
);

CREATE TABLE IF NOT EXISTS BUILDS (
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

CREATE TABLE IF NOT EXISTS BATTERIES (
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

CREATE TABLE IF NOT EXISTS PLACES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT REFERENCES USERS,
    title TEXT,
    description TEXT NULL,
    googleMapsLink TEXT,
    imgPath TEXT NULL,
    modified TEXT
);

CREATE TABLE IF NOT EXISTS RATES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT REFERENCES USERS,
    title TEXT,
    description TEXT NULL,
    rateType TEXT,

    rollRcRate REAL NULL,
    rollRate REAL NULL,
    rollExpo REAL NULL,
    rollAcroPlus REAL NULL,
    rollCurve REAL NULL,
    rollCenterSens REAL NULL,
    rollMaxRate REAL NULL,

    pitchRcRate REAL NULL,
    pitchRate REAL NULL,
    pitchExpo REAL NULL,
    pitchAcroPlus REAL NULL,
    pitchCurve REAL NULL,
    pitchCenterSens REAL NULL,
    pitchMaxRate REAL NULL,

    yawRcRate REAL NULL,
    yawRate REAL NULL,
    yawExpo REAL NULL,
    yawAcroPlus REAL NULL,
    yawCurve REAL NULL,
    yawCenterSens REAL NULL,
    yawMaxRate REAL NULL,
    
    modified TEXT
);

INSERT INTO USERS (username, password) 
VALUES ('Caesar', '$2b$10$JeynWsPj5cJMm49.SoVi4O1ifReIRPrUkrW20TFuqKwAKXSPAYNbG'),
       ('Johnny', '$2a$10$0Ip30OoJhFY2fqCN4zq8S.YGULYQpxI4ik4zJBm8JpH5TurRTg90m');

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
    '2022-02-20T00:00:00.307Z'
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
    '2022-02-20T00:00:00.307Z',
    '2022-05-22T00:00:00.307Z'
), (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-02-20T00:00:00.307Z',
    '2022-05-22T00:00:00.307Z'
), (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-02-20T00:00:00.307Z',
    '2022-05-22T00:00:00.307Z'
), (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-04-10T10:00:00.307Z',
    '2022-05-22T00:00:00.307Z'
), (
    'Caesar',
    'TATTU',
    'Tattu R-Line LiPo Akku 6S 1050 mAh 130C V4',
    1050,
    6,
    'https://www.rctech.de/tattu-r-line-lipo-akku-6s-1050-mah-130c-v4.html',
    'LIPO',
    '2022-04-10T10:00:00.307Z',
    '2022-05-22T00:00:00.307Z'
);

INSERT INTO PLACES (
    username,
    title,
    description,
    googleMapsLink,
    imgPath,
    modified
) 
VALUES (
    'Caesar',
    'Wöllersdorf - Biotop',
    'Small biotope with an open field in Wöllersdorf.',
    'https://www.google.com/maps/place/Biotop/@47.8690291,16.1627163,905m/data=!3m1!1e3!4m5!3m4!1s0x476dc84420b3f2e7:0xc9031d1e2acacdae!8m2!3d47.8694726!4d16.1603921',
    '1653226553263_Woellersdorf_Biotop.png',
    '2022-02-20T00:00:00.307Z'
), (
    'Caesar',
    'Bruck an der Leitha - Schloss Prugg',
    'Abandoned castle in ''Bruck an der Leitha''.',
    'https://www.google.com/maps/place/Schloss+Prugg/@48.0290551,16.7756954,3995m/data=!3m1!1e3!4m5!3m4!1s0x476c5b8b6a3f97a9:0x8fe5bf9275480666!8m2!3d48.0257724!4d16.7827474!5m1!1e4',
    NULL,
    '2022-02-20T00:00:00.307Z'
), (
    'Caesar',
    'Pottendorf - Schloss',
    'Abandoned castle in Pottendorf.',
    'https://www.google.com/maps/place/Schloss+Pottendorf/@47.9104108,16.3862886,1261m/data=!3m1!1e3!4m13!1m7!3m6!1s0x476c4b300030150b:0x8b9e45d84d862dc0!2s2486+Pottendorf!3b1!8m2!3d47.911426!4d16.3881078!3m4!1s0x476c4b2e472c6733:0xa6415fd6911c3d7d!8m2!3d47.9113498!4d16.3847057!5m1!1e4',
    NULL,
    '2022-02-20T00:00:00.307Z'
), (
    'Caesar',
    'Blumau - Ruinen Feld',
    'Open fields with trees, fences and ruins in Blumau.',
    'https://www.google.com/maps/place/Werkstra%C3%9Fe+4,+2602+Blumau/@47.9221945,16.3062693,148m/data=!3m1!1e3!4m5!3m4!1s0x476db44f0053029b:0xf1e57695d2c30117!8m2!3d47.9220965!4d16.3063377',
    NULL,
    '2022-02-20T00:00:00.307Z'
);

INSERT INTO RATES (
    username,
    title,
    description,
    rateType,

    rollRcRate,
    rollRate,
    rollExpo,
    rollAcroPlus,
    rollCurve,
    rollCenterSens,
    rollMaxRate,

    pitchRcRate,
    pitchRate,
    pitchExpo,
    pitchAcroPlus,
    pitchCurve,
    pitchCenterSens,
    pitchMaxRate,

    yawRcRate,
    yawRate,
    yawExpo,
    yawAcroPlus,
    yawCurve,
    yawCenterSens,
    yawMaxRate,

    modified
) VALUES (
    'Caesar',
    '5" freestyle',
    'My default fast rates for freestyle on 5inch.',
    'BETAFLIGHT',

    2.00,
    0.64,
    0.25,
    NULL,
    NULL,
    NULL,
    NULL,

    2.00,
    0.64,
    0.25,
    NULL,
    NULL,
    NULL,
    NULL,

    1.68,
    0.64,
    0.25,
    NULL,
    NULL,
    NULL,
    NULL,

    '2022-02-20T00:00:00.307Z'
);

-- Down
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS BUILDS;
DROP TABLE IF EXISTS BATTERIES;
DROP TABLE IF EXISTS PLACES;
DROP TABLE IF EXISTS RATES;