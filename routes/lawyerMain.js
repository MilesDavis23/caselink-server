const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/* Get lawyer cases  */
router.get('/my-cases', (req, res) => {
    const filePath = path.join(__dirname, '..', 'test_data', 'test_cases.json');
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            console.error("Error during reading the file:", error);
            return res.status(500).send('Error reading dummy data.');
        }
        res.send(data);
    });
});


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