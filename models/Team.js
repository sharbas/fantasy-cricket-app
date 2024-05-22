// models/Team.js
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [{ type: String, required: true }], // Player names
  captain: { type: String, required: true }, // Player name
  viceCaptain: { type: String, required: true }, // Player name
  points: { type: Number, default: 0 },
});

module.exports = mongoose.model('Team', TeamSchema);
