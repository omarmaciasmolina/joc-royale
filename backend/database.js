const { Pool } = require("pg");

// Configuración de PostgreSQL
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "joc_royale",
    password: "1dostres4",
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};

