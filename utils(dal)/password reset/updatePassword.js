const pool = require('../database/database');

function resetPassword(email, newPassword) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE USERS SET password = ? WHERE email = ?';
        pool.query(query, [newPassword, email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    resetPassword
};