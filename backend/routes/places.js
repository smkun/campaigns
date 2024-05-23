//routes/places.js
const express = require("express");
const router = express.Router();
const Place = require("../models/place");

// @route   GET api/places
// @desc    Get all places
// @access  Public
router.get("/", async (req, res) => {
  try {
    const places = await Place.find().populate("campaigns charactersPresent");
    res.json(places);
  } catch (err) {
    console.error("Error fetching places:", err);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// @route   POST api/places
// @desc    Create a new place
// @access  Public
router.post("/", async (req, res) => {
  const { name, type, charactersPresent, campaigns } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: "Name and type are required" });
  }

  try {
    const newPlace = new Place({
      name,
      type,
      charactersPresent: charactersPresent || [],
      campaigns: campaigns || []
    });
    const place = await newPlace.save();
    res.json(place);
  } catch (err) {
    console.error("Error creating place:", err);
    res.status(500).json({ error: "Failed to create place" });
  }
});

// @route   DELETE api/places/:id
// @desc    Delete a place
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    await place.remove();
    res.json({ success: true, message: "Place deleted successfully" });
  } catch (err) {
    console.error("Error deleting place:", err);
    res.status(500).json({ error: "Failed to delete place" });
  }
});

// @route   PUT api/places/:id
// @desc    Update a place
// @access  Public
router.put("/:id", async (req, res) => {
  const { name, type, charactersPresent, campaigns } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: "Name and type are required" });
  }

  try {
    let place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    place.name = name;
    place.type = type;
    place.charactersPresent = charactersPresent;
    place.campaigns = campaigns;

    place = await place.save();
    res.json(place);
  } catch (err) {
    console.error("Error updating place:", err);
    res.status(500).json({ error: "Failed to update place" });
  }
});

module.exports = router;
