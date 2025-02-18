const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slot_number: { type: Number, required: true },
  room: { type: String, required: true },
  subject: { type: String, required: true },
  faculty: { type: String, required: true }
});

const timetableSchema = new mongoose.Schema({
  day: { type: String, required: true, enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] },
  slots: { type: [slotSchema], required: true }
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
