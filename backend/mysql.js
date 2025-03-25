const mysql = require('mysql2/promise'); // Using promise-based MySQL

// Create MySQL connection pool
const connection =  mysql.createPool({
  host: 'localhost', // Adjust as needed
  user: 'root',
  password: 'dembele99',
  database: 'g-fest-practice'

});

module.exports = connection;