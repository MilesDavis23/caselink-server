const express = require('express');
const router = express.Router();
const { saveCase } = require('../utils(dal)/make a case/saveCase');
const { verifyJWT } = require('../services/tokenService');


/* Middleware for checking the checking the token and getting the user id. */
router.use('/create', (req, res, next) => {
    const token = req.cookies.authToken;
    if(!token) {
        return res.status(401).json({error: 'Authentication failed. Required cookie not found.'})
    }
    const verifiedData = verifyJWT(token);
    if(!verifiedData){
        return res.status(401).json({error: 'Authentication denied. Not a valid user. '})
    }
    req.user = verifiedData;
    next();
})

/* Make a case endpoint: */
router.post('/create', async (req, res) => {
    //add timestamp 
    const { title, briefDescription, detailedDescription, caseCategory, categoryTags, timestamp  } = req.body;
    const userId = req.user.userId;
    try {
        console.log(categoryTags, caseCategory)
        console.log(req.body)
        await saveCase(userId, title, briefDescription, detailedDescription, caseCategory, categoryTags, timestamp); //saving it as JSON currently
        res.status(200).json({ success: true, message: 'Case saved successfully!'});
    } catch (error) {
        console.error("Error saving the case:", error)
        res.status(500).json({ success: false, message: "Internal server error."});
    }
});

module.exports = router;