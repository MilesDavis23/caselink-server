const express = require('express');
const router = express.Router();
const cases = require('../utils(dal)/cases/all-cases') 

/* add a middleware here for checking cookie data.  */

router.get('/', (req, res, ) => {

    cases.getAllCases()
        .then(cases => {
            res.json(cases);
        })
        .catch(error => {
            return res.status(500).json({error: 'Failed to retrive cases.'});
        });
});

module.exports = router;