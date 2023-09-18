const pool = require('../database/database');


const getOffer = (userId, caseId) => {
    return new Promise((resolve, reject) => {
        /* here , maybe selet the offerID too.  */
        const query = `
        SELECT o.offerID, o.offerDetails, o.offerPrice, o.offerStatus  
        FROM Offers AS o 
        JOIN CASES AS c ON o.caseID = c.case_id 
        WHERE c.user_id = ? AND c.case_id = ?
    `;
        pool.query(query, [userId, caseId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
                console.log(results)
            }
        });
    })
}

module.exports = {
    getOffer
}