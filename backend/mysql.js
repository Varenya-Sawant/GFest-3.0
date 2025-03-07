const mysql = require('mysql2/promise'); // Using promise-based MySQL

// Create MySQL connection pool
const connection =  mysql.createPool({
  host: '127.0.0.1', // Adjust as needed
  user: 'root',
  password: '',
  database: 'g_fest'
});

module.exports = connection;