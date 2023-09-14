const pool = require('../database/database');

function insertIntoLawyerMyCases(userId, caseId) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO LawyerMyCases (lawyerID, caseID) VALUES (?, ?)'
        pool.query(query, [userId, caseId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
};

module.exports = {
    insertIntoLawyerMyCases
};

