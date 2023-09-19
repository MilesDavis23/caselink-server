const pool = require('../database/database');

const getCasesForPerson = (userId) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM CASES WHERE user_id = ? AND status = 'active'`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getCasesForLawyer = (OfereeID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT C.*
            FROM Offers O
            JOIN CASES C ON O.CaseID = C.case_id
            WHERE O.ofereeID = ? AND O.offerStatus = 'active' AND C.status = 'active';
        `;
        pool.query(query, [OfereeID], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports = {
    getCasesForPerson,
    getCasesForLawyer
}