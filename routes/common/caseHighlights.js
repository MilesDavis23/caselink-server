const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../../services/tokenService');
const { getCasesForPerson, getCasesForLawyer } = require('../../utils(dal)/cases/caseHighlights')

router.use('/', (req, res, next) => {
    const token = req.cookies.authToken

    if (!token) {
        return res.status(401).json({error: 'Authentication failed. Required cookie not found.'})
    };

    const verifiedData = verifyJWT(token);
    if(!verifiedData) {
        return res.status(401).json({error: 'Authentication denied. Not a valid user.' })
    };

    if(verifiedData.role !== 'lawyer' && verifiedData.role !== 'client') {
        return res.status(401).json({error: 'Invalid role. Access denied. '})
    } 

    /* Check on this later: */
    req.user = verifiedData;
    next();
});


router.get('/', async (req, res) => {

    const userRole = req.user.role;
    const userId = req.user.userId;
    console.log(userId)
    console.log(userRole)
    try {
        let cases;
        if (userRole === 'lawyer') {
            console.log('fetching lawyer')
            cases = await getCasesForLawyer(userId);
        } else if (userRole === 'client') {
            console.log('fetching client')
            cases = await getCasesForPerson(userId);
        }
        console.log(cases)
        res.json(cases);
    } catch (error) {
        console.error('This is the error:' , error);
        res.status(500).json({ success: false, message: 'Internal server error. Failed receving cases. ' })
    };

});

module.exports = router;
