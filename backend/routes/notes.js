//routes/notes.js
const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const Character = require("../models/character");
const Place = require("../models/place");
const Campaign = require("../models/campaign");

// @route   GET api/notes
// @desc    Get all notes
// @access  Public
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().populate("campaign characters places");
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// @route   POST api/notes
// @desc    Create a new note
// @access  Public
router.post("/", async (req, res) => {
  const { name, campaign, characters, places, content } = req.body;

  if (!name || !campaign || !content) {
    return res.status(400).json({ error: "Name, campaign, and content are required" });
  }

  try {
    const newNote = new Note({
      name,
      campaign,
      characters,
      places,
      content,
    });
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// @route   DELETE api/notes/:id
// @desc    Delete a note
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    await note.remove();
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// @route   PUT api/notes/:id
// @desc    Update a note
// @access  Public
router.put("/:id", async (req, res) => {
  const { name, campaign, characters, places, content } = req.body;

  if (!name || !campaign || !content) {
    return res.status(400).json({ error: "Name, campaign, and content are required" });
  }

  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    note.name = name;
    note.campaign = campaign;
    note.characters = characters;
    note.places = places;
    note.content = content;

    note = await note.save();
    res.json(note);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Failed to update note" });
  }
});

module.exports = router;
