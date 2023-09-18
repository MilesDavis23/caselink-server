const pool = require('../database/database');

const getUserDataBasedOnUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM USERS WHERE user_id = ?`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results);
            }
        })
    })
}

module.exports = {
    getUserDataBasedOnUserId
};