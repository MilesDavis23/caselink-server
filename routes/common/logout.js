const express = require('express');
const router = express.Router();

/* Logging out and clearing the cookies: */
router.post('/', async (req, res) => {
    res.clearCookie('authToken');
    console.log('Token has been cleared. ')
    res.status(200).json({ message: 'Logged out succesfully. '});
})

module.exports = router;