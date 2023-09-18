const pool = require('../database/database');

const updateOfferStatus = async ( offerId, caseId, status) => {
    return new Promise((resolve, reject) => {
        const query = `
        UPDATE Offers
        SET offerStatus = ?
        WHERE offerID = ? AND caseID = ?;
        `;
        pool.query(query, [status, offerId, caseId], (error, results) => {
            if (error){
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
}

const updateCaseStatusToActive = async (status, userId, caseId) => {
    return new Promise((resolve, reject) => {
        const query = `
        UPDATE CASES
        SET status = ?
        WHERE user_id = ? AND case_id = ?;
        `;
        pool.query(query, [status, userId, parseInt(caseId)], (error, results) => {
            console.log('query: ', query, [status, userId, parseInt(caseId)]);
            if (error){
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
}

module.exports = {
    updateOfferStatus, 
    updateCaseStatusToActive
}





/*
const updateOfferStatus = async (offerId, status) => {
    const query = `UPDATE LawyerMyCases SET status = ? WHERE offerID = ?`;
    return await database.execute(query, [status, offerId]);
};
*/