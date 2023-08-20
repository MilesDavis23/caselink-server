const pool = require('../database/database');

function getMyCasesByLawyerId(lawyerId) {
     return new Promise ((resolve, reject) => {
        const query = `SELECT 
            C.case_id, 
            C.title, 
            C.brief_description, 
            C.detailed_description, 
            C.case_category,
            L.status,
            L.lawyer_case_id
        FROM 
            LAWYERSCASES L
        JOIN 
            CASES C ON L.case_id = C.case_id
        WHERE 
            L.lawyer_id = ?
        `;
        pool.query(query, [lawyerId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
     }); 
}

module.exports = {
    getMyCasesByLawyerId
}

/*
getBookmarkedCasesByLawyer(lawyerId)
    .then(cases => {
        console.log("Fetched cases:", cases);
    })
    .catch(error => {
        console.error("Error fetching cases:", error);
    });
 */