const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../../services/tokenService');
const { changeStatus } = require('../../utils(dal)/cases/change-status');

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
})

router.post('/', async (req, res) => {
    const { caseId, status } = req.body;
    console.log(`Changing case status according to lawyer inpuit. CaseId: &{caseId}`);
    try {
        await changeStatus(status, caseId);
        res.status(200).json({ success: true, message: 'Status has been updated succsefully!'});
    } catch (error) {
        console.error('Error updating the status: ', error);
        res.status(500).json({ success: false, message: 'Internal server error during updating status.' })
    }
});

module.exports = router