//models/character.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  player: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  pronoun: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }]
});

module.exports = mongoose.model("Character", CharacterSchema);
