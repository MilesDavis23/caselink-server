const express = require('express');
const { verifyJWT } = require('../../services/tokenService');
const router = express.Router();
const cases = require('../../utils(dal)/offer management/getOffer');


router.use('/', (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({error: 'Authentication failed. Required cookie not found.'})
    };

    const verifiedData = verifyJWT(token);
    if(!verifiedData) {
        return res.status(401).json({error: 'Authentication denied. Not a valid user.' })
    };

    if(verifiedData.role !== 'client') {
        return res.status(401).json({error: 'Invalid role. Access denied. '})
    };

    /* Check on this later: */
    req.user = verifiedData;
    next();

});

router.get('/', async (req, res) => {
    const { caseId } = req.query
    const userId = req.user.userId;
    console.log(userId)
    try {
        const offer = await cases.getOffer(userId, caseId);
        res.json(offer)
    } catch (error) {
        console.log('Error retriving cases:', error);
        return res.status(500).json({error: 'Failed to retrive my cases.'});
    };
});

module.exports = router;