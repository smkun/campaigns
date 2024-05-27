// Import required modules
const express = require("express"); // Express framework for building web applications
const router = express.Router(); // Create a new router object
const Note = require("../models/note"); // Import the Note model
const Character = require("../models/character"); // Import the Character model
const Place = require("../models/place"); // Import the Place model
const Campaign = require("../models/campaign"); // Import the Campaign model

//Get
router.get("/", async (req, res) => {
  try {
    // Fetch all notes from the database, populating related campaign, characters, and places
    const notes = await Note.find().populate("campaign characters places");
    res.json(notes); // Send the notes as a JSON response
  } catch (err) {
    console.error("Error fetching notes:", err); // Log the error to the console
    res.status(500).json({ error: "Failed to fetch notes" }); // Send a 500 status code and error message if an error occurs
  }
});

//Post
router.post("/", async (req, res) => {
  const { name, campaign, characters, places, content } = req.body; // Destructure the required fields from the request body

  if (!name || !campaign || !content) { // Check if required fields are missing
    return res.status(400).json({ error: "Name, campaign, and content are required" }); // Send a 400 status code and error message if any required field is missing
  }

  try {
    // Create a new note instance with the request body data
    const newNote = new Note({
      name,
      campaign,
      characters,
      places,
      content,
    });
    const note = await newNote.save(); // Save the new note to the database
    res.json(note); // Send the newly created note as a JSON response
  } catch (err) {
    console.error("Error creating note:", err); // Log the error to the console
    res.status(500).json({ error: "Failed to create note" }); // Send a 500 status code and error message if an error occurs
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id); // Find the note by ID
    if (!note) {
      return res.status(404).json({ error: "Note not found" }); // Send a 404 status code and error message if the note is not found
    }
    await note.remove(); // Remove the note from the database
    res.json({ success: true, message: "Note deleted successfully" }); // Send a success message as a JSON response
  } catch (err) {
    console.error("Error deleting note:", err); // Log the error to the console
    res.status(500).json({ error: "Failed to delete note" }); // Send a 500 status code and error message if an error occurs
  }
});

//Put
router.put("/:id", async (req, res) => {
  const { name, campaign, characters, places, content } = req.body; // Destructure the required fields from the request body

  if (!name || !campaign || !content) { // Check if required fields are missing
    return res.status(400).json({ error: "Name, campaign, and content are required" }); // Send a 400 status code and error message if any required field is missing
  }

  try {
    let note = await Note.findById(req.params.id); // Find the note by ID
    if (!note) {
      return res.status(404).json({ error: "Note not found" }); // Send a 404 status code and error message if the note is not found
    }

    // Update the note with the request body data
    note.name = name;
    note.campaign = campaign;
    note.characters = characters;
    note.places = places;
    note.content = content;

    note = await note.save(); // Save the updated note to the database
    res.json(note); // Send the updated note as a JSON response
  } catch (err) {
    console.error("Error updating note:", err); // Log the error to the console
    res.status(500).json({ error: "Failed to update note" }); // Send a 500 status code and error message if an error occurs
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
