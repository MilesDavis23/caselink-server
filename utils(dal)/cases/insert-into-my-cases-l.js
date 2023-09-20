const pool = require('../database/database');

function insertIntoLawyerMyCases(userId, caseId) {
    return new Promise((resolve, reject) => {
        /* check for the combination if it alredy exists: */
        const checkQuery = 'SELECT 1 FROM LawyerMyCases WHERE lawyerID = ? AND caseID = ?';
        pool.query(checkQuery, [userId, caseId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length === 0) {
                    const insertQuery = 'INSERT INTO LawyerMyCases (lawyerID, caseID) VALUES (?, ?)';
                    pool.query(insertQuery, [userId, caseId], (insertError, insertResults) => {
                        if (insertError) {
                            reject(insertError);
                        } else {
                            resolve(insertResults);
                        }
                    });
                } else {
                    resolve({ message: 'The case already exists in yout ' });
                }
            }
        });
    });
};

module.exports = {
    insertIntoLawyerMyCases
};


/* the old one:
function insertIntoLawyerMyCases(userId, caseId) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO LawyerMyCases (lawyerID, caseID) VALUES (?, ?, ?)'
        pool.query(query, [userId, caseId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
};
*/

