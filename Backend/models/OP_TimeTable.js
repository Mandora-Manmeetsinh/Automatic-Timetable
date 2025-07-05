const mongoose = require('mongoose');

const fixedSlotSchema = new mongoose.Schema({
  division: { type: String, required: true },
  day: { type: Number, required: true },     // 1 = Monday, 2 = Tuesday, etc.
  period: { type: Number, required: true },  // 1, 2, 3, ...
  teacher: { type: String, required: true },
  room: { type: String, required: true },
  subject: { type: String, required: true }
});

module.exports = mongoose.model('FixedSlot', fixedSlotSchema);
