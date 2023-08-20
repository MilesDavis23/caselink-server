const express = require('express');
const router = express.Router();
const { registerUser } = require('../utils(dal)/registration/registration');

router.post('/', async (req, res) => {
    const { username, email, password, role, profilePicURL, address } = req.body;

    try {
        await registerUser(username, email, password, role, profilePicURL, address);
        res.status(200).json({ success: true, message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;
