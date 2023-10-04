const pool = require('../database/database');

function getCaseByCaseId(caseId) {
    return new Promise ((resolve, reject) => {
        const query = `
            SELECT c.*, u.username, u.profile_img_url 
            FROM CASES AS c 
            JOIN USERS AS u ON c.user_id = u.user_id 
            WHERE c.case_id = ?
        `;
        pool.query(query, [caseId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results)
                resolve(results);
            }
        });
    });
}

module.exports = {
    getCaseByCaseId
}
