const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../services/tokenService')
const dal = require('../utils(dal)/cases/all-cases') 

/* add a middleware here for checking cookie data.  */
router.use ('/', (req, res, next) => {
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

router.get('/', async (req, res, ) => {
    const userId = req.user.userId;
    console.log('Fetching browse cases for laywer. User Id:', userId);
    try {
        const cases = await dal.getAllCases(userId);
        res.json(cases);
    } catch (error) {
        console.error("Error fetching cases:", error);
        return res.status(500).json({error: 'Failed to retrieve cases.'});
    }
});

module.exports = router;