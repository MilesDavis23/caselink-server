const pool = require('../database/database');

function getCaseByCaseId(caseId) {
    return new Promise ((resolve, reject) => {
        const query = 'SELECT * FROM CASES WHERE case_id = ?';
        pool.query(query, [caseId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports = {
    getCaseByCaseId
}