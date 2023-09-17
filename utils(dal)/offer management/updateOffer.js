const pool = require('../database/database');

const updateOfferStatus = async (userId, status) => {
    return new Promise((resolve, reject) => {
        /* thid query basically search for the offer and changes basedon User-Clinet userID, add the offer ID too. */
        const query = `
        UPDATE Offers o
        JOIN CASES c ON o.caseID = c.case_id
        SET o.offerStatus = ?
        WHERE c.user_id = ?;
        `;
        pool.query(query, [status, userId], (error, results) => {
            if (error){
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
}

module.exports = {
    updateOfferStatus
}





/*
const updateOfferStatus = async (offerId, status) => {
    const query = `UPDATE LawyerMyCases SET status = ? WHERE offerID = ?`;
    return await database.execute(query, [status, offerId]);
};
*/