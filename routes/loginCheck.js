const express = require('express');
const router = express.Router();
const { getPassword } = require('../utils(dal)/login/login');

router.post('/', async (req, res) => {
    const { password } = req.body;

    try {
        const userRole = await getPassword(password);

        if (userRole) {
            const data = userRole;

            res.cookie('data', data, { httpOnly: false });
            
            res.status(200).json({ success: true, message: "Login successful!", role: userRole });

        } else {
            res.status(401).json({ success: false, message: "Invalid password." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
        console.error('Error in login route: ', error)
    }
})

module.exports = router;


