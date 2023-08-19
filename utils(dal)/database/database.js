const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost', 
    user: 'root',
    password: 'petiland',
    database: 'CaselinkDB'
});

/*
pool.query('SELECT * FROM USERS', (error, results) => {
    if (error) throw error;
    console.log(results);
});
*/

module.exports = pool;