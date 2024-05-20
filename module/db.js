import mysql from "mysql2/promise.js";

// Create a pool of database connections
const pool = mysql.createPool({
    host: 'localhost',
    port: '3308',
    user: 'root',
    password: '',
    database: 'GritAcademy',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    rowsAsArray: true
  });

  export default pool;