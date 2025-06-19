const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  latitude: Number,
  longitude: Number,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Spot', SpotSchema);
