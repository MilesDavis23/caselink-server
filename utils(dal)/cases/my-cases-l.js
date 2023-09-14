const pool = require('../database/database');
/* This gets cases from LawyerMyCases based on user id  */
function getMyCasesByLawyerUserId(userId) {
    return new Promise ((resolve, reject) => {
        const query = 'SELECT * FROM LawyerMyCases WHERE user_id ?';
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports = {
    getMyCasesByLawyerUserId
}