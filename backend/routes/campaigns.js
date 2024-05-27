// Import required modules
const express = require("express"); // Express framework for building web applications
const router = express.Router(); // Create a new router object
const Campaign = require("../models/campaign"); // Import the Campaign model

// GET all campaigns
router.get("/", async (req, res) => {
    try {
        const campaigns = await Campaign.find(); // Fetch all campaigns from the database
        res.json(campaigns); // Send the campaigns as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a 500 status code and error message if an error occurs
    }
});

// POST create a new campaign
router.post("/", async (req, res) => {
    const campaign = new Campaign(req.body); // Create a new campaign instance with the request body data
    try {
        const newCampaign = await campaign.save(); // Save the new campaign to the database
        res.status(201).json(newCampaign); // Send the newly created campaign as a JSON response with a 201 status code
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send a 400 status code and error message if an error occurs
    }
});

// PUT update a campaign
router.put("/:id", async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id); // Find the campaign by ID
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" }); // Send a 404 status code and error message if the campaign is not found
        }
        Object.assign(campaign, req.body); // Update the campaign with the request body data
        const updatedCampaign = await campaign.save(); // Save the updated campaign to the database
        res.json(updatedCampaign); // Send the updated campaign as a JSON response
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send a 400 status code and error message if an error occurs
    }
});

// DELETE a campaign
router.delete("/:id", async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id); // Find the campaign by ID
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" }); // Send a 404 status code and error message if the campaign is not found
        }
        await campaign.remove(); // Remove the campaign from the database
        res.json({ message: "Campaign deleted" }); // Send a success message as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a 500 status code and error message if an error occurs
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
