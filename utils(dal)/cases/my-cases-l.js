const pool = require('../database/database');
/* This gets cases from LawyerMyCases based on user id  */
function getMyCasesByLawyerUserId(userId) {
    return new Promise((resolve, reject) => {
        const query =
        `
        SELECT CASES.* 
        FROM LawyerMyCases
        JOIN CASES ON LawyerMyCases.caseID = CASES.case_id 
        WHERE LawyerMyCases.lawyerID = ?
        `;
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
};

/**
 * Previously on the project:
 * currenyl cresting a dal, that can take both the lawyer.userID +
 * caseID, ot will be abble fetch all the cases which belong to that ID
 * in the lawyercases table 
 * 
 */