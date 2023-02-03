const { Pool }= require('pg');

const db = new Pool(
    {
        host: "database",
        user: "postgres",
        port: 5432,
        password: "postgres",
        database: "postgres"
    }
);

module.exports = db;