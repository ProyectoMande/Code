const { Pool }= require('pg');

const db = new Pool(
    {
        host: "172.17.0.2",
        user: "postgres",
        port: 5432,
        password: "postgis",
        database: "postgres"
    }
);

module.exports = db;