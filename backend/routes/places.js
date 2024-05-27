// Import required modules
const express = require("express"); // Express framework for building web applications
const router = express.Router(); // Create a new router object
const Place = require("../models/place"); // Import the Place model

//Get
router.get("/", async (req, res) => {
  try {
    // Fetch all places from the database, populating related campaigns and charactersPresent
    const places = await Place.find().populate("campaigns charactersPresent");
    res.json(places); // Send the places as a JSON response
  } catch (err) {
    console.error("Error fetching places:", err); // Log the error to the console
    res.status(500).json({ error: "Failed to fetch places" }); // Send a 500 status code and error message if an error occurs
  }
});

//Post
router.post("/", async (req, res) => {
  const { name, type, charactersPresent, campaigns } = req.body; // Destructure the required fields from the request body

  if (!name || !type) { // Check if required fields are missing
    return res.status(400).json({ error: "Name and type are required" }); // Send a 400 status code and error message if any required field is missing
  }

  try {
    // Create a new place instance with the request body data
    const newPlace = new Place({
      name,
      type,
      charactersPresent: charactersPresent || [], // Set charactersPresent to an empty array if not provided
      campaigns: campaigns || [] // Set campaigns to an empty array if not provided
    });
    const place = await newPlace.save(); // Save the new place to the database
    res.json(place); // Send the newly created place as a JSON response
  } catch (err) {
    console.error("Error creating place:", err); // Log the error to the console
    res.status(500).json({ error: "Failed to create place" }); // Send a 500 status code and error message if an error occurs
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id); // Find the place by ID
    if (!place) {
      return res.status(404).json({ error: "Place not found" }); // Send a 404 status code and error message if the place is not found
    }
    await place.remove(); // Remove the place from the database
    res.json({ success: true, message: "Place deleted successfully" }); // Send a success message as a JSON response
  } catch (err) {
    console.error("Error deleting place:", err); // Log the error to the console
    res.status(500).json({ error: "Failed to delete place" }); // Send a 500 status code and error message if an error occurs
  }
});

//Put
router.put("/:id", async (req, res) => {
  const { name, type, charactersPresent, campaigns } = req.body; // Destructure the required fields from the request body

  if (!name || !type) { // Check if required fields are missing
    return res.status(400).json({ error: "Name and type are required" }); // Send a 400 status code and error message if any required field is missing
  }

  try {
    let place = await Place.findById(req.params.id); // Find the place by ID
    if (!place) {
      return res.status(404).json({ error: "Place not found" }); // Send a 404 status code and error message if the place is not found
    }

    // Update the place with the request body data
    place.name = name;
    place.type = type;
    place.charactersPresent = charactersPresent;
    place.campaigns = campaigns;

    place = await place.save(); // Save the updated place to the database
    res.json(place); // Send the updated place as a JSON response
  } catch (err) {
    console.error("Error updating place:", err); // Log the error to the console
    res.status(500).json({ error: "Failed to update place" }); // Send a 500 status code and error message if an error occurs
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
