const express = require('express');
const router = express.Router();
const { registerUser } = require('../utils(dal)/registration/registration');
const brypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { username, email, password, role, profilePicURL, address } = req.body;

    hashedPassword = await brypt.hash(password, 10);

    try {
        await registerUser(username, email, hashedPassword, role, profilePicURL, address);
        console.log(username, email, hashedPassword, role, profilePicURL, address)
        console.log(password)
        res.status(200).json({ success: true, message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;
