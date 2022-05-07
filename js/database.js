const sqlite3 = require('sqlite3');
const sqlite = require("sqlite");

async function openDb() {
    return sqlite.open({
        // filename: process.env.DB_PATH,
        // filename: "/home/remote/production/rc-manager.db",
        filename: "D:\\sqlite\\DB\\rc-manager.db",
        driver: sqlite3.Database
    });
}

async function migrate() {
    const db = await openDb();
    db.migrate({ force: "last", migrationsPath: "./migrations/" })
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
        modified
    } = build;

    return db.all(`
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
             ${!!description ? `'${description}',` : `NULL,`},
            '${escName}',
            '${escLink}',
            '${fcName}',
            '${fcLink}',
            '${motorName}',
            '${motorLink}',
            '${frameName}',
            '${frameLink}',
            '${vtxName}',
            '${vtxLink}',
            '${antennaName}',
            '${antennaLink}',
            '${cameraName}',
            '${cameraLink}',
            '${receiverName}',
            '${receiverLink}',
            '${propellerName}',
            '${propellerLink}',
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

const config = {
    openDb,
    migrate,
    getUserLogin,
    getUserBuilds,
    addUserBuild,
    removeUserBuild,
}

module.exports = config;