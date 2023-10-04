const pool = require('../database/database'); // Adjust the path to your database connection

function getNotificationsByUserId(userId) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT N.* 
            FROM Notifications N
            JOIN Offers O ON N.case_id = O.caseID
            WHERE O.ofereeID = ? AND N.is_read = 0
        `;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

function getNotificationsByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * 
            FROM Notifications 
            WHERE message LIKE ? AND is_read = 0
        `;
        pool.query(query, [`%${username}%`], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getNotificationsByUserId,
    getNotificationsByUsername
};
