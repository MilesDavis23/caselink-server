const express = require('express');
const router = express.Router();
const { updateOfferStatus, updateCaseStatusToActive } = require('../../utils(dal)/offer management/updateOffer');

/* this endpoint updates the LawyerMyCases table  */
router.put('/', async (req, res) => {
    const { offerId, userId, caseId, status } = req.body;
    console.log(req.body)

    try {

        const result = await updateOfferStatus(offerId, caseId, status);
        if (result.affectedRows > 0) {
            if (status === 'active' || 'declined') {
                let caseUpdateResult;
                if (status === 'declined') {
                    caseUpdateResult = await updateCaseStatusToActive('added', userId, caseId)
                } else {
                    caseUpdateResult = await updateCaseStatusToActive(status, userId, caseId);

                }
                if (caseUpdateResult.affectedRows > 0) {
                    res.json({
                        success: true,
                        message: `Offer has been ${status} and corresponding case status updated to active.`
                    });
                } else {
                    res.json({
                        success: true,
                        message: `Offer has been ${status}, but failed to update corresponding case status.`
                    });
                }
            } else {
                res.json({
                    success: true,
                    message: `Offer has been ${status}.`
                });
            }
        } else {
            res.json({
                success: false,
                message: 'No offer found to update.'
            });
        }
    } catch (error) {
        console.error('Error updating offer status:', error);
        res.status(500).json({ error: 'Failed to update offer status.' });
    }
})

module.exports = router;