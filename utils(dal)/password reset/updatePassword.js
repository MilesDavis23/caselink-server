const pool = require('../database/database');
const bcrypt = require('bcrypt');

function resetPassword(email, newPassword) {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const query = 'UPDATE USERS SET password = ? WHERE email = ?';
            pool.query(query, [hashedPassword, email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            })
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    resetPassword
};