//models/note.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  name: { type: String, required: true },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  content: { type: String, required: true },
});

module.exports = mongoose.model("Note", NoteSchema);
