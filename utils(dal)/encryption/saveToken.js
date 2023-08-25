const pool = require('../database/database');

function saveToken(token, email, expirationTime) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO PasswordResets (email, token, expiration) VALUES (?, ?, ?)';
        pool.query(query, [email,  token,  expirationTime],  (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
                console.log(`Token ${token} which expires in ${expirationTime}`);
            }
        });
    });

}

module.exports = {
    saveToken
}