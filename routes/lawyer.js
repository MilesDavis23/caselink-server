const express = require('express');
const router = express.Router();
const getCasesDal = require('../utils(dal)/cases/my-cases');

router.get('/my-cases/:lawyerId', (req, res) => {
    const lawyerId = req.params.lawyerId;
    getCasesDal.getMyCasesByLawyerId(lawyerId, (error, cases) => {
        if (error) {
            return res.status(500).json({error: 'Failed to tetrive my cases.'})
        }
        res.json(cases);
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