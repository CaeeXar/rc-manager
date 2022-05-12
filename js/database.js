const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDb() {
    return sqlite.open({
        // filename: process.env.DB_PATH,
        // filename: "/home/remote/production/rc-manager.db",
        filename: 'D:\\sqlite\\DB\\rc-manager.db',
        driver: sqlite3.Database,
    });
}

async function migrate() {
    const db = await openDb();
    db.migrate({ force: 'last', migrationsPath: './migrations/' });
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

const config = {
    openDb,
    migrate,

    // auth
    getUserLogin,

    // builds
    getUserBuilds,
    addUserBuild,
    removeUserBuild,
    getUserBuildById,
    updateUserBuild,

    // batteries
    getUserBatteries,
    removeUserBattery,
    getUserBatteryById,
    updateUserBattery,
    addUserBattery,

    // places
    getUserPlaces,
};

module.exports = config;
