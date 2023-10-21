const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../../services/tokenService')
const dal = require('../../utils(dal)/notifications/getNotifications'); 
const { changeAllNotificationByUserIdForAllNoti, changeAllNotificationByUserNameForAllNoti } = require('../../utils(dal)/notifications/markAsRead');

/* add a middleware here for checking cookie data.  */
router.use ('/', (req, res, next) => {
    const token = req.cookies.authToken
    console.log(req.cookies.authToken)
    console.log(token)
    if (!token) {
        return res.status(401).json({error: 'Authentication failed. Required cookie not found.'})
    };

    const verifiedData = verifyJWT(token);
    if(!verifiedData) {
        return res.status(401).json({error: 'Authentication denied. Not a valid user.' })
    };

    if(verifiedData.role !== 'lawyer' && verifiedData.role !== 'client') {
        return res.status(401).json({error: 'Invalid role. Access denied. '})
    };

    /* Check on this later: */
    req.user = verifiedData;
    console.log(req.user)
    next();
});

router.get('/', async (req, res) => {
    const userId = req.user.userId;
    const username = req.user.username;
    const userRole = req.user.role;

    let data;
    console.log(userRole)
    try {
        if ( userRole === 'lawyer') {
            console.log(userId)
            data = await dal.getNotificationsByUserId(userId)
            console.log('Norifications has be fetched for lawyer'); 
            console.log(data)
            res.json(data)
        } else if ( userRole === 'client') {
            console.log(userId)
            data = await dal.getNotificationsByUsername(username);   
            console.log('Notification for clients.');
            console.log(data)
            res.json(data);
        }
    } catch (error) {
        console.log('Error getting the noticiations:', error.message);
        return res.status(500).json({ error: 'Failed to retriving notifications for user. ' })
    }
});

router.put('/mark-as-read/all', async (req, res) => {
    const userId = req.user.userId;
    const username = req.user.username;
    const userRole = req.user.role;

    try {
        if ( userRole === 'lawyer') {
            await changeAllNotificationByUserIdForAllNoti(userId);
            res.status(200).json({error: `Notifications has been changed to read for user: ${userId}` })
        } else if ( userRole === 'client') {
            await changeAllNotificationByUserNameForAllNoti(username)
            res.status(200).json({error: `Notifications has been changed to read for user: ${userId}` })
        }
    } catch (error) {
        console.log('Error updating notifications: ', error.message);
        return res.status(500).json({error: `Failed to update notifications for user ${userId}`})
    }
});

module.exports = router;