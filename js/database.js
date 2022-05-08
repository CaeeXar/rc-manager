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
            escLink = '${escLink}',
            fcName = '${fcName}',
            fcLink = '${fcLink}',
            motorName = '${motorName}',
            motorLink = '${motorLink}',
            frameName = '${frameName}',
            frameLink = '${frameLink}',
            vtxName = '${vtxName}',
            vtxLink = '${vtxLink}',
            antennaName = '${antennaName}',
            antennaLink = '${antennaLink}',
            cameraName = '${cameraName}',
            cameraLink = '${cameraLink}',
            receiverName = '${receiverName}',
            receiverLink = '${receiverLink}',
            propellerName = '${propellerName}',
            propellerLink = '${propellerLink}',
            modified = '${modified}'
        WHERE LOWER(username) = LOWER('${username}')
        AND id = ${id};
    `);
}

const config = {
    openDb,
    migrate,
    getUserLogin,
    getUserBuilds,
    addUserBuild,
    removeUserBuild,
    getUserBuildById,
    updateUserBuild,
};

module.exports = config;
