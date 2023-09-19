const express = require('express');
const { saveOffer } = require('../../utils(dal)/offer management/saveOffer');
const { updateCaseStatusToActive } = require('../../utils(dal)/offer management/updateOffer');
const { getCaseByCaseId } = require('../../utils(dal)/cases/case-byId');
const router = express.Router();

router.post('/', async (req, res) => {
    const { caseId, ofereeId, offerDescription, offerAmmount } = req.body;

    try {
        const currentCase = await getCaseByCaseId(caseId);
        if (!currentCase[0]) {
            return res.status(404).json({ success: false, message: "Case not found." });
        }

        const userId = currentCase[0].user_id;
        const status = 'sent';
        
        await updateCaseStatusToActive('offer sent', userId, caseId)
        await saveOffer(caseId, ofereeId, offerDescription, offerAmmount, status);
        res.status(200).json({ success: true, message: "Offer sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;