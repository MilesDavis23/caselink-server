const pool = require('../database/database');

function getAllCases(userId){
    return new Promise ((resolve, reject) => {
        const query = `
            SELECT C.* 
            FROM CASES C
            LEFT JOIN LawyerMyCases LMC ON C.case_id = LMC.caseID AND LMC.lawyerID = ?
            WHERE LMC.lawyerID IS NULL
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
    getAllCases
}