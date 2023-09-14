const express = require('express');
const router = express.Router();
const insert = require('../../utils(dal)/cases/insert-into-my-cases-l');
const { verifyJWT } = require('../../services/tokenService');

router.use('/', (req, res, next) => {
    const token = req.cookies.authToken

    if (!token) {
        return res.status(401).json({error: 'Authentication failed. Required cookie not found.'})
    };

    const verifiedData = verifyJWT(token);
    if(!verifiedData) {
        return res.status(401).json({error: 'Authentication denied. Not a valid user.'})
    };

    if(verifiedData.role !== 'lawyer') {
        return res.status(401).json({error: 'Invalid role. Access denied.'})
    };

    req.user = verifiedData;
    next();
});

router.post('/', async (req, res) => {
    const { caseId } = req.body;
    const userId = req.user.userId;
    console.log('user id:' , userId, 'case id:', caseId);
    try {
        await insert.insertIntoLawyerMyCases(userId, caseId);
        res.status(200).json({ success: true, message: 'Case saved successfully!'});
    } catch (error) {
        console.error('Error saving the case to the dabase:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' })
    }
});

module.exports = router;