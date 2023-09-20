const pool = require('../database/database');

const changeStatus = (status, caseId) => {
    return new Promise ((resolve, reject) => {
        const query = `UPDATE CASES SET status = ? WHERE case_id = ?`;
        pool.query(query, [status,  caseId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports = {
    changeStatus
}