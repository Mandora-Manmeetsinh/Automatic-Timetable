const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room_no: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  room_type: { type: String, required: true },
  equipment: [{ type: String }] // parsed from comma-separated list
});

module.exports = mongoose.model('Room', roomSchema);
