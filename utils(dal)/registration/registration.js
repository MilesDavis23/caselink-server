const pool = require('../database/database');

function registerUser(username, email, hashedPassword, role, profilePicURL, address) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO USERS (username, password, email, role, profile_img_url, address) VALUES (?, ?, ?, ?, ?, ?)';
        pool.query(query, [username, hashedPassword, email, role, profilePicURL, address], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    registerUser
};
