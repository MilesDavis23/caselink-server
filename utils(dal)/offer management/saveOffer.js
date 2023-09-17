const pool = require('../database/database');

const saveOffer = (caseId, ofereeId, offerDescription, offerAmmount, status) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Offers (caseID, ofereeID, offerDetails, offerPrice, offerStatus) VALUES (?, ?, ?, ?, ?)';
        pool.query(query, [caseId, ofereeId, offerDescription, parseFloat(offerAmmount), status], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    })
}

module.exports = {
    saveOffer
}