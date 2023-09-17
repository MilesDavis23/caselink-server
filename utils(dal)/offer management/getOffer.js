const pool = require('../database/database');

const getOffer = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT o.offerDetails, o.offerPrice FROM Offers AS o JOIN CASES AS c ON o.caseID = c.case_id WHERE c.user_id = ?`;
        pool.query(query, [userId], (error, results) => {
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