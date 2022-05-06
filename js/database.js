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
        FROM USER 
        WHERE LOWER(username) = LOWER('${username}')
    `);
}

const config = {
    openDb,
    migrate,
    getUserLogin,
}

module.exports = config;