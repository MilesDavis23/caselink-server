const pool = require('../database/database');

function validateToken(token) {
    return new Promise((resolve, reject) => {
        const query = 
        `SELECT
            id,
            email,
            token,
            expiration
        FROM
            PasswordResets
        WHERE
            token = ?`;

        pool.query(query, [token], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(`Token ${token} has been succesfully validated. `)
                if (results.length > 0) {
                    resolve(results[0].email);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

module.exports = {
    validateToken
}