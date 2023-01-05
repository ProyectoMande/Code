const { Pool }= require('pg');

const db = new Pool(
    {
        host: "172.17.0.2", // hostname -i (del contenedor)
        user: "postgres",
        port: 5432,
        password: "postgres",
        database: "mande"
    }
);

module.exports = db;