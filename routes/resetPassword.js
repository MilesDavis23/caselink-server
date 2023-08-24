const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils(dal)/token generator/token');
const { getUserByEmail } = require('../utils(dal)/password reset/userByEmail')
const { saveToken } = require('../utils(dal)/encryption/saveToken');
const { validateToken } = require('../utils(dal)/encryption/validateToken');
const { invalidateToken } = require('../utils(dal)/encryption/invalidateToken');
const emailservice = require('../services/emailServce');
const { resetPassword } = require('../utils(dal)/password reset/updatePassword');



router.post('/password-reset', async (req, res) => {
    /* Check if email is in DB, creates a unique token, saves it into the dedicated
    table. */ 
    const { email } = req.body; 

    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: "Email not found." });
    }

    const token = generateToken();

    const expirationTime = new Date();
    /* set the expiration to one hour */
    expirationTime.setHours(expirationTime.getHours() + 1);
    /* format the time so the sql can take it: */
    const formattedExpirationTime = `${expirationTime.getFullYear()}-${String(expirationTime.getMonth() + 1).padStart(2, '0')}-${String(expirationTime.getDate()).padStart(2, '0')} ${String(expirationTime.getHours()).padStart(2, '0')}:${String(expirationTime.getMinutes()).padStart(2, '0')}:${String(expirationTime.getSeconds()).padStart(2, '0')}`;
    await saveToken(token, email, formattedExpirationTime);

    const resetLink = `http://localhost:3000/password-reset?token=${token}`;
    await emailservice.sendResetPasswordEmail(email, resetLink);
    

    return res.status(200).json({ messager: 'Password reset email sent. '});

});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    /* Validate the token  */
    const email = await validateToken(token);
    if (!email) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    /* Update the password: */
     try {
        await resetPassword(email, newPassword);
     } catch (error) {
        console.error('The following error happened during updating the password:', error);
        return res.status(500).json({ message: 'Error updating the password. '});
     }

    /* this is purely optional: */
    await invalidateToken(token);

    return res.status(200).json({ message: "Password update was succesfull!"})
})

/* Optionally, rernder the password change page.  */

module.exports = router;