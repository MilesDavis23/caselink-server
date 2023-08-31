const express = require('express');
const router = express.Router();
const { encrypt } = require('../utils(dal)/encryption/encryption');
const { getUserByEmail } = require('../utils(dal)/password reset/userByEmail');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    const { password, email } = req.body;

    try {

        const validUser = await getUserByEmail(email);
        if(!validUser) {
            return res.status(400).json({message: 'Not a valid e-mail.'});
        }

        if (!password) {
            return res.status(200).json({ message: 'Email is valid.'})
        }
        console.log(validUser)
        console.log(validUser.password)
        console.log(password)

        const match = await bcrypt.compare(password, validUser.password)
        console.log(match)
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid password.'})
        }

        const encryptedUserRole = encrypt(password, validUser.role);
        res.cookie('encryptedData', encryptedUserRole, { httpOnly: true});
        res.cookie('publicData', 'Some Public Data');
        /* res.cookie('data', data, { httpOnly: false }); */
        res.status(200).json({ success: true, message: "Login successful!", role: validUser.role });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
        console.error('Error in login route: ', error)
    }
});

module.exports = router;


