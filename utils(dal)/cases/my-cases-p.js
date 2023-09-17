const pool = require('../database/database');
/* This dal gets cases from the CASES table, by user_id */
function getMyCasesByUserId(userId) {
    return new Promise ((resolve, reject) => {
        const query = 'SELECT * FROM CASES WHERE user_id = ?';
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getMyCasesByUserId
}