const pool = require('../database/database');

function saveCase(userId, title, briefDescription, detailedDescription, caseCategory) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO CASES (user_id, title, brief_description, detailed_description, case_category) VALUES (?, ?, ?, ?, ?)';
        pool.query(query, [userId, title, briefDescription, detailedDescription, caseCategory], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
}

module.exports = {
    saveCase
};