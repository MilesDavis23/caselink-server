const pool = require('../database/database');

function getPassword(password) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) as count FROM USERS WHERE password = ?';
        pool.query(query, [password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]?.count > 0);
            }
        })
    })
}


module.exports = {
    getPassword
}