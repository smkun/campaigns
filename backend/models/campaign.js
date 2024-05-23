//models/campaign.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  name: { type: String, required: true },
  system: { type: String, required: true },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
});

module.exports = mongoose.model("Campaign", CampaignSchema);
