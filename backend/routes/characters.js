// Import required modules
const express = require("express"); // Express framework for building web applications
const router = express.Router(); // Create a new router object
const Character = require("../models/character"); // Import the Character model

// GET all characters
router.get("/", async (req, res) => {
    try {
        const characters = await Character.find(); // Fetch all characters from the database
        res.json(characters); // Send the characters as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a 500 status code and error message if an error occurs
    }
});

// POST create a new character
router.post("/", async (req, res) => {
    const { player, name, class: charClass, race, pronoun, level, campaigns } = req.body; // Destructure the required fields from the request body
  
    if (!player || !name || !charClass || !race || !pronoun) { // Check if required fields are missing
        return res.status(400).json({ error: "Player, name, class, race, and pronoun are required" }); // Send a 400 status code and error message if any required field is missing
    }
  
    try {
        // Create a new character instance with the request body data
        const newCharacter = new Character({
            player,
            name,
            class: charClass,
            race,
            pronoun,
            level,
            campaigns: campaigns || [] // Set campaigns to an empty array if not provided
        });
        const character = await newCharacter.save(); // Save the new character to the database
        res.json(character); // Send the newly created character as a JSON response
    } catch (err) {
        console.error("Error creating character:", err); // Log the error to the console
        res.status(500).json({ error: "Failed to create character" }); // Send a 500 status code and error message if an error occurs
    }
});

// PUT update a character
router.put("/:id", async (req, res) => {
    try {
        const character = await Character.findById(req.params.id); // Find the character by ID
        if (!character) {
            return res.status(404).json({ message: "Character not found" }); // Send a 404 status code and error message if the character is not found
        }
        Object.assign(character, req.body); // Update the character with the request body data
        const updatedCharacter = await character.save(); // Save the updated character to the database
        res.json(updatedCharacter); // Send the updated character as a JSON response
    } catch (err) {
        res.status(400).json({ message: err.message }); // Send a 400 status code and error message if an error occurs
    }
});

// DELETE a character
router.delete("/:id", async (req, res) => {
    try {
        const character = await Character.findById(req.params.id); // Find the character by ID
        if (!character) {
            return res.status(404).json({ message: "Character not found" }); // Send a 404 status code and error message if the character is not found
        }
        await character.remove(); // Remove the character from the database
        res.json({ message: "Character deleted" }); // Send a success message as a JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Send a 500 status code and error message if an error occurs
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
