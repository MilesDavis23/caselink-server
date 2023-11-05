const pool = require('../database/database');

function saveCase(userId, title, shortDescription, longDescription, categories, categoryTags, timestamp) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO CASES (user_id, title, brief_description, detailed_description, case_category, Tags, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
        pool.query(query, [userId, title, shortDescription, longDescription, categories, categoryTags, timestamp], (error, results) => {
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