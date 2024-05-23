//routes/characters.js
const express = require("express");
const router = express.Router();
const Character = require("../models/character");

// GET all characters
router.get("/", async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST api/characters
// @desc    Create a new character
// @access  Public
router.post("/", async (req, res) => {
    const { player, name, class: charClass, race, pronoun, level, campaigns } = req.body;
  
    if (!player || !name || !charClass || !race || !pronoun) {
      return res.status(400).json({ error: "Player, name, class, race, and pronoun are required" });
    }
  
    try {
      const newCharacter = new Character({
        player,
        name,
        class: charClass,
        race,
        pronoun,
        level,
        campaigns: campaigns || []
      });
      const character = await newCharacter.save();
      res.json(character);
    } catch (err) {
      console.error("Error creating character:", err);
      res.status(500).json({ error: "Failed to create character" });
    }
  });
  

// PUT update a character
router.put("/:id", async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: "Character not found" });
        }
        Object.assign(character, req.body);
        const updatedCharacter = await character.save();
        res.json(updatedCharacter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a character
router.delete("/:id", async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: "Character not found" });
        }
        await character.remove();
        res.json({ message: "Character deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
