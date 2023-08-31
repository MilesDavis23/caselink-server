const pool =  require('../database/database');

function getUserByEmail(email) {

    return new Promise((resolve, reject) => {
        const query =  'SELECT * FROM USERS WHERE email = ?'

        pool.query(query, [email], (error, results) => {
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
    getUserByEmail
}