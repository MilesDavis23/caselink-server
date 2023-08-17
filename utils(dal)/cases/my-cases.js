const pool = require('./');

function getMyCasesByLawyerId(lawyerId) {
     return new Promise ((resolve, reject) => {
        const query = 'SELECT * FROM LAWYERCASE WHER lawyer_id = ?';
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