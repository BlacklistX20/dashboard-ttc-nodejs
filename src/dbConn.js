// db.js
require('dotenv').config(); // Load .env values

const mysql = require('mysql2/promise');

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // Optional: 10s timeout
};

const temp = mysql.createPool({
  ...poolConfig,
  database: process.env.DB_NAME_TEMP,
});

const electric = mysql.createPool({
  ...poolConfig,
  database: process.env.DB_NAME_ELECTRIC,
});

const fuel = mysql.createPool({
  ...poolConfig,
  database: process.env.DB_NAME_FUEL,
});

module.exports = { temp, electric, fuel };
