const sqlite3 = require('sqlite3');
const sqlite = require("sqlite");

async function openDb() {
    return sqlite.open({
        filename: process.env.DB_PATH,
        // filename: "/home/remote/production/rc-manager.db",
        // filename: "D:\\sqlite\\DB\\rc-manager.db",
        driver: sqlite3.Database
    });
}

async function migrate() {
    const db = await openDb();
    db.migrate({ force: "last", migrationsPath: "./migrations/" })
}

const config = {
    openDb,
    migrate,
}

module.exports = config;