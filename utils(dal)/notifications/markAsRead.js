const pool = require('../database/database');

function changeAllNotificationByUserIdForAllNoti(userId) {
    return new Promise((resolve, reject) => {
        const query = 
        `
        UPDATE Notifications N
        JOIN Offers O ON N.case_id = O.caseID
        SET N.is_read = 1
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

function changeAllNotificationByUserNameForAllNoti(username) {
    return new Promise((resolve, reject) => {
        const query = 
        `
        UPDATE Notifications
        SET is_read = 1
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
}

module.exports = {
    changeAllNotificationByUserIdForAllNoti, 
    changeAllNotificationByUserNameForAllNoti
};



