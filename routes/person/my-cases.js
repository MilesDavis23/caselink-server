const express = require('express');
const { verifyJWT } = require('../../services/tokenService');
const router = express.Router();
const cases = require('../../utils(dal)/cases/my-cases-p');

router.use('/', (req, res, next) => {
    const token = req.cookies.authToken

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

router.get('/', (req, res) => {
    const userId =  req.user.userId;

    cases.getMyCasesByUserId(userId)
        .then(cases => {
            res.json(cases);
        })
        .catch(error => {
            console.error('Error retriving cases:', error);
            return res.status(500).json({error: 'Failed to retrive mt cases.'});
        });
});

module.exports = router;