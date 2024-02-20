const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'test',
    password: 'jishnudev',
    user: 'root'
});

module.exports = pool.promise();