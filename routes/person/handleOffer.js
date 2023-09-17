const express = require('express');
const router = express.Router();
const { updateOfferStatus } = require('../../utils(dal)/offer management/updateOffer');

/* this endpoint updates the LawyerMyCases table  */
router.put('/', async (req, res) => {
    const { userId, status } = req.body;
    console.log(req.body)

    try {
        const result = await updateOfferStatus(userId, status);
        res.json({message: 'Status updated successfully', result });
    } catch (error) {
        console.error('Error updating offer status:', error);
        res.status(500).json({ error: 'Failed to update offer status.' });
    }
})

module.exports = router;