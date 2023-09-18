const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../../services/tokenService');
const { getUserDataBasedOnUserId } = require('../../utils(dal)/users/getUser')


/* GET users listing. */
router.use('/',  async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({error: 'Authenctication failed. Required cookie not found.'});
    };

    const verifiedData = verifyJWT(token);
    console.log(verifiedData)
    console.log(verifiedData.role)
    if(!verifiedData) {
        return res.status(401).json({error: 'Authentication denied. Not a valid user.' })
    };

    if(verifiedData.role !== 'client' && verifiedData.role !== 'lawyer') {
        return res.status(401).json({error: 'Invalid role. Access denied. '})
    };

    /* Check on this later: */
    req.user = verifiedData;
    next();
});

router.get('/', async (req, res) => {
    const userId = req.user.userId;
    try {
        const userData = await getUserDataBasedOnUserId(userId);
        console.log(userData);
        res.send(userData);
    } catch (error) {
        console.log('Error getting userData:', error);
        res.status(500).json({ error: 'Failed to update offer status.' });
    }
});

module.exports = router;
