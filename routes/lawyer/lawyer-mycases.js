const express = require('express');
const router = express.Router();
const mycases = require('../../utils(dal)/cases/my-cases-l');
const { verifyJWT } = require('../../services/tokenService');


router.use('/', (req, res, next) => {
    const token = req.cookies.authToken

    if (!token) {
        return res.status(401).json({error: 'Authentication failed. Required cookie not found.'})
    };

    const verifiedData = verifyJWT(token);
    if(!verifiedData) {
        return res.status(401).json({error: 'Authentication denied. Not a valid user.' })
    };

    if(verifiedData.role !== 'lawyer') {
        return res.status(401).json({error: 'Invalid role. Access denied. '})
    };

    /* Check on this later: */
    req.user = verifiedData;
    next();
});

router.get('/', async (req, res) => {
    const userId = req.user.userId;
    console.log(userId)
    try {
        const cases = await mycases.getMyCasesByLawyerUserId(userId);
        res.json(cases);
    } catch (error) {
        console.log('Error gettin the cases form CASES:', error.message);
        return res.status(500).json({ error: 'Failed to retriving my cases for user. ' })

    };
});

module.exports = router; 