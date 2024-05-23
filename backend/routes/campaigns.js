// routes/campaigns.js
const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");

// GET all campaigns
router.get("/", async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new campaign
router.post("/", async (req, res) => {
    const campaign = new Campaign(req.body);
    try {
        const newCampaign = await campaign.save();
        res.status(201).json(newCampaign);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a campaign
router.put("/:id", async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        Object.assign(campaign, req.body);
        const updatedCampaign = await campaign.save();
        res.json(updatedCampaign);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a campaign
router.delete("/:id", async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        await campaign.remove();
        res.json({ message: "Campaign deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
