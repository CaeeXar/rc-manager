const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function openDb() {
  return sqlite.open({
    filename: process.env.DB_PATH,
    // filename: "/home/remote/production/rc-manager.db",
    // filename: 'D:\\sqlite\\DB\\rc-manager.db',
    driver: sqlite3.Database,
  });
}

async function migrate() {
  const db = await openDb();
  db.migrate({ force: "last", migrationsPath: "./migrations/" });
}

async function getUserLogin(username) {
  const db = await openDb();
  return db.get(`
        SELECT *
        FROM USERS 
        WHERE LOWER(username) = LOWER('${username}');
    `);
}

async function getUserBuilds(username) {
  const db = await openDb();
  return db.all(`
        SELECT *
        FROM BUILDS 
        WHERE LOWER(username) = LOWER('${username}');
    `);
}

async function getUserBuildById(username, id) {
  const db = await openDb();
  return db.get(`
        SELECT *
        FROM BUILDS 
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

async function addUserBuild(build) {
  const db = await openDb();
  const {
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
    modified,
  } = build;

  if (!username) return;

  return db.run(`
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
        ) VALUES (
            '${username}',
            '${title}',
             ${!!description ? `'${description}'` : `NULL`},
            '${escName}',
            ${!!escLink ? `'${escLink}'` : `NULL`},
            '${fcName}',
            ${!!fcLink ? `'${fcLink}'` : `NULL`},
            '${motorName}',
            ${!!motorLink ? `'${motorLink}'` : `NULL`},
            '${frameName}',
            ${!!frameLink ? `'${frameLink}'` : `NULL`},
            '${vtxName}',
            ${!!vtxLink ? `'${vtxLink}'` : `NULL`},
            '${antennaName}',
            ${!!antennaLink ? `'${antennaLink}'` : `NULL`},
            '${cameraName}',
            ${!!cameraLink ? `'${cameraLink}'` : `NULL`},
            '${receiverName}',
            ${!!receiverLink ? `'${receiverLink}'` : `NULL`},
            '${propellerName}',
            ${!!propellerLink ? `'${propellerLink}'` : `NULL`},
            '${modified}'
        );
    `);
}

async function removeUserBuild(id) {
  const db = await openDb();
  return db.run(`
        DELETE FROM BUILDS 
        WHERE id = '${id}';
    `);
}

async function updateUserBuild(build) {
  const db = await openDb();
  const {
    id,
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
    modified,
  } = build;

  if (!id || !username) return new sqlite.Statement();

  return db.run(`
        UPDATE BUILDS 
        SET title = '${title}',
            description = ${!!description ? `'${description}'` : `NULL`},
            escName = '${escName}',
            escLink = ${!!escLink ? `'${escLink}'` : `NULL`},
            fcName = '${fcName}',
            fcLink = ${!!fcLink ? `'${fcLink}'` : `NULL`},
            motorName = '${motorName}',
            motorLink = ${!!motorLink ? `'${motorLink}'` : `NULL`},
            frameName = '${frameName}',
            frameLink = ${!!frameLink ? `'${frameLink}'` : `NULL`},
            vtxName = '${vtxName}',
            vtxLink = ${!!vtxLink ? `'${vtxLink}'` : `NULL`},
            antennaName = '${antennaName}',
            antennaLink = ${!!antennaLink ? `'${antennaLink}'` : `NULL`},
            cameraName = '${cameraName}',
            cameraLink = ${!!cameraLink ? `'${cameraLink}'` : `NULL`},
            receiverName = '${receiverName}',
            receiverLink = ${!!receiverLink ? `'${receiverLink}'` : `NULL`},
            propellerName = '${propellerName}',
            propellerLink = ${!!propellerLink ? `'${propellerLink}'` : `NULL`},
            modified = '${modified}'
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

async function getUserBatteries(username) {
  const db = await openDb();
  return db.all(`
        SELECT *
        FROM BATTERIES 
        WHERE LOWER(username) = LOWER('${username}');
    `);
}

async function removeUserBattery(id) {
  const db = await openDb();
  return db.run(`
        DELETE FROM BATTERIES 
        WHERE id = '${id}';
    `);
}

async function getUserBatteryById(username, id) {
  const db = await openDb();
  return db.get(`
        SELECT *
        FROM BATTERIES 
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

async function updateUserBattery(battery) {
  const db = await openDb();
  const {
    id,
    username,
    brand,
    description,
    capacity,
    cells,
    link,
    batteryType,
    created,
    modified,
  } = battery;

  if (!id || !username) return new sqlite.Statement();

  return db.run(`
        UPDATE BATTERIES 
        SET brand = '${brand}',
            description = ${!!description ? `'${description}'` : `NULL`},
            capacity = '${capacity}',
            cells = '${cells}',
            link = ${!!link ? `'${link}'` : `NULL`},
            batteryType = '${batteryType}',
            created = '${created}',
            modified = '${modified}'
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

async function addUserBattery(battery) {
  const db = await openDb();
  const {
    username,
    brand,
    description,
    capacity,
    cells,
    link,
    batteryType,
    created,
    modified,
  } = battery;

  if (!username) return;

  return db.run(`
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
        ) VALUES (
            '${username}',
            '${brand}',
             ${!!description ? `'${description}'` : `NULL`},
            '${capacity}',
            '${cells}',
             ${!!link ? `'${link}'` : `NULL`},
            '${batteryType}',
            '${created}',
            '${modified}'
        );
    `);
}

async function getUserPlaces(username) {
  const db = await openDb();
  return db.all(`
        SELECT *
        FROM PLACES 
        WHERE LOWER(username) = LOWER('${username}');
    `);
}

async function getUserPlaceById(username, id) {
  const db = await openDb();
  return db.get(`
        SELECT *
        FROM PLACES 
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

async function removeUserPlace(id) {
  const db = await openDb();
  return db.run(`
        DELETE FROM PLACES 
        WHERE id = '${id}';
    `);
}

async function updateUserPlace(place) {
  const db = await openDb();
  const {
    id,
    username,
    title,
    description,
    googleMapsLink,
    imgPath,
    modified,
  } = place;

  if (!username) return;

  return db.run(`
        UPDATE PLACES 
        SET title = '${title}',
            description = ${!!description ? `'${description}'` : `NULL`},
            googleMapsLink = '${googleMapsLink}',
            imgPath = ${!!imgPath ? `'${imgPath}'` : `NULL`},
            modified = '${modified}'
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

async function addUserPlace(place) {
  const db = await openDb();
  const { username, title, description, googleMapsLink, imgPath, modified } =
    place;

  if (!username) return;

  return db.run(`
        INSERT INTO PLACES (
            username,
            title,
            description,
            googleMapsLink,
            imgPath,
            modified
        ) VALUES (
            '${username}',
            '${title}',
             ${!!description ? `'${description}'` : `NULL`},
            '${googleMapsLink}',
             ${!!imgPath ? `'${imgPath}'` : `NULL`},
            '${modified}'
        );
    `);
}

async function getRateTypes() {
  const db = await openDb();
  return db.all(`
        SELECT *
        FROM RATETYPES;
    `);
}

async function getUserRates(username) {
  const db = await openDb();
  return db.all(`
        SELECT *
        FROM RATES 
        WHERE LOWER(username) = LOWER('${username}');
    `);
}

async function getUserRateById(username, id) {
  const db = await openDb();
  return db.get(`
        SELECT *
        FROM RATES 
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

async function removeUserRate(id) {
  const db = await openDb();
  return db.run(`
        DELETE FROM RATES 
        WHERE id = '${id}';
    `);
}

async function addUserRate(rate) {
  const db = await openDb();
  const {
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
    modified,
  } = rate;

  if (!username) return;

  return db.run(`
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
            '${username}',
            '${title}',
             ${!!description ? `'${description}'` : `NULL`},
             '${rateType}',
             
             ${!!rollRcRate ? `${rollRcRate}` : `NULL`},
             ${!!rollRate ? `${rollRate}` : `NULL`},
             ${!!rollExpo ? `${rollExpo}` : `NULL`},
             ${!!rollAcroPlus ? `${rollAcroPlus}` : `NULL`},
             ${!!rollCurve ? `${rollCurve}` : `NULL`},
             ${!!rollCenterSens ? `${rollCenterSens}` : `NULL`},
             ${!!rollMaxRate ? `${rollMaxRate}` : `NULL`},
             
             ${!!pitchRcRate ? `${pitchRcRate}` : `NULL`},
             ${!!pitchRate ? `${pitchRate}` : `NULL`},
             ${!!pitchExpo ? `${pitchExpo}` : `NULL`},
             ${!!pitchAcroPlus ? `${pitchAcroPlus}` : `NULL`},
             ${!!pitchCurve ? `${pitchCurve}` : `NULL`},
             ${!!pitchCenterSens ? `${pitchCenterSens}` : `NULL`},
             ${!!pitchMaxRate ? `${pitchMaxRate}` : `NULL`},

             ${!!yawRcRate ? `${yawRcRate}` : `NULL`},
             ${!!yawRate ? `${yawRate}` : `NULL`},
             ${!!yawExpo ? `${yawExpo}` : `NULL`},
             ${!!yawAcroPlus ? `${yawAcroPlus}` : `NULL`},
             ${!!yawCurve ? `${yawCurve}` : `NULL`},
             ${!!yawCenterSens ? `${yawCenterSens}` : `NULL`},
             ${!!yawMaxRate ? `${yawMaxRate}` : `NULL`},

            '${modified}'
        );
    `);
}

async function updateUserRate(rate) {
  const db = await openDb();
  const {
    id,
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
    modified,
  } = rate;

  if (!username) return;

  return db.run(`
        UPDATE RATES 
        SET title = '${title}',
            description = ${!!description ? `'${description}'` : `NULL`},
            rateType = '${rateType}',

            rollRcRate = ${!!rollRcRate ? `${rollRcRate}` : `NULL`},
            rollRate = ${!!rollRate ? `${rollRate}` : `NULL`},
            rollExpo = ${!!rollExpo ? `${rollExpo}` : `NULL`},
            rollAcroPlus = ${!!rollAcroPlus ? `${rollAcroPlus}` : `NULL`},
            rollCurve = ${!!rollCurve ? `${rollCurve}` : `NULL`},
            rollCenterSens = ${!!rollCenterSens ? `${rollCenterSens}` : `NULL`},
            rollMaxRate = ${!!rollMaxRate ? `${rollMaxRate}` : `NULL`},
            pitchRcRate = ${!!pitchRcRate ? `${pitchRcRate}` : `NULL`},
            pitchRate = ${!!pitchRate ? `${pitchRate}` : `NULL`},
            pitchExpo = ${!!pitchExpo ? `${pitchExpo}` : `NULL`},
            pitchAcroPlus = ${!!pitchAcroPlus ? `${pitchAcroPlus}` : `NULL`},
            pitchCurve = ${!!pitchCurve ? `${pitchCurve}` : `NULL`},
            pitchCenterSens = ${
              !!pitchCenterSens ? `${pitchCenterSens}` : `NULL`
            },
            pitchMaxRate = ${!!pitchMaxRate ? `${pitchMaxRate}` : `NULL`},
            yawRcRate = ${!!yawRcRate ? `${yawRcRate}` : `NULL`},
            yawRate = ${!!yawRate ? `${yawRate}` : `NULL`},
            yawExpo = ${!!yawExpo ? `${yawExpo}` : `NULL`},
            yawAcroPlus = ${!!yawAcroPlus ? `${yawAcroPlus}` : `NULL`},
            yawCurve = ${!!yawCurve ? `${yawCurve}` : `NULL`},
            yawCenterSens = ${!!yawCenterSens ? `${yawCenterSens}` : `NULL`},
            yawMaxRate = ${!!yawMaxRate ? `${yawMaxRate}` : `NULL`},
            modified = '${modified}'
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

const config = {
  openDb,
  migrate,

  // auth
  getUserLogin,

  // builds
  getUserBuilds,
  getUserBuildById,
  addUserBuild,
  removeUserBuild,
  updateUserBuild,

  // batteries
  getUserBatteries,
  getUserBatteryById,
  addUserBattery,
  removeUserBattery,
  updateUserBattery,

  // places
  getUserPlaces,
  getUserPlaceById,
  addUserPlace,
  removeUserPlace,
  updateUserPlace,

  //rates
  getRateTypes,
  getUserRates,
  getUserRateById,
  addUserRate,
  removeUserRate,
  updateUserRate,
};

module.exports = config;
