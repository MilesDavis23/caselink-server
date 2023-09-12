const pool = require('../database/database');

function getAllCases(){
    return new Promise ((resolve, reject) => {
        const query = `SELECT * FROM CASES`;
        pool.query(query, (error, results) => {
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