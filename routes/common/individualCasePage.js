const express = require('express');
const router = express.Router();
const cases = require('../../utils(dal)/cases/case-byId');

router.get('/:caseId', async (req, res) => {
    const { caseId } = req.params;

    try {
        const casedata = await cases.getCaseByCaseId(caseId);
        if (!casedata) {
            return res.status(404).json({ error: " Case not found. "});
        };
        res.json(casedata);
    } catch (error) {
        console.error("Error fetching case data: ", error);
        res.status(500).json({ error: "Server error."});
    }
});

module.exports = router;