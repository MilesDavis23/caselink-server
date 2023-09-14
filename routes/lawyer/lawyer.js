const express = require('express');
const router = express.Router();
const getCasesDal = require('../../utils(dal)/cases/my-cases');
const { decrypt } = require('../../utils(dal)/encryption/encryption');

router.use('/my-case', (req, res, next) => {
    if (!req.cookies.encryptedData) {
        return res.status(401).json({error: 'Authentication failed.. No avaiable cookie. '})
    }

    const decryptedData = decrypt(req.cookies.encryptedData);

    if (!decryptedData || (decryptedData !== 'lawyer' && decryptedData !== 'admin' && decryptedData !== 'client') ) {
        return res.status(401).json({ error: 'Not authenticated. Invalid cookie data.'})
    }

    next();
});

router.get('/my-cases', (req, res) => {
    /* const accessedCookies = req.cookies.data */
    const lawyerId = 1;
    getCasesDal.getMyCasesByLawyerId(lawyerId)
    .then(cases => {
        res.json(cases);
        console.log('cookies: ', 'All cookies: ', req.cookies)
    })
    .catch(error => {
        return res.status(500).json({error: 'Failed to retrieve my cases.'});
    });
});

module.exports = router; 

/*
router.get('/my-cases', function(req, res, next) {

    const connection = createConnection({
        host: 'localhost',
        user: 'root',
        password: 'petiland2',
        database: 'sql'
    });

    const lawyerId = req.query.lawyerId;

    connection.query('SELECT * FROm Cases WHERE lawyerId = ?', [lawyerId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error fetching cases. ');
            return;
        }
        res.json()
    });

    connection.end();
});
*/


module.exports = router;