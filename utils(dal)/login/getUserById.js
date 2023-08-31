const pool = require('../database/database');

function getUserById(userId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM USERS WHERE user_id = ?';
        pool.query(query, [password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0])
                } else {
                    resolve(null);
                }
            }
        }) 
    })
}

module.exports = {
    getUserById
}

