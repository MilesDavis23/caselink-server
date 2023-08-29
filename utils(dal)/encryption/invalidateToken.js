const pool = require('../database/database');

function invalidateToken(token) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM PasswordResets WHERE token = ?';
        pool.query(query, [token], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(`Token ${token} has been succesfully invalidated. `)
                resolve(results);
            }
        })
    })
}

module.exports = {
    invalidateToken
};