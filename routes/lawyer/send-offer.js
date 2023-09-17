const express = require('express');
const { saveOffer } = require('../../utils(dal)/offer management/saveOffer');
const router = express.Router();

router.post('/', async (req, res) => {
    const { caseId, ofereeId, offerDescription, offerAmmount } = req.body;
    try {
        const status = 'sent'
        await saveOffer(caseId, ofereeId, offerDescription, offerAmmount, status);
        res.status(200).json({ success: true, message: "Offer sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;