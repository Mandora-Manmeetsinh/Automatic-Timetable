const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    required: true,
  },
  slot_number: {
    type: Number,
    min: 1,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  is_external: {
    type: Boolean,
    required: true,
  },
  slot_type: {
    type: String,
    enum: ['dynamic', 'fixed'],
    required: true,
  },
  fixed_slots: {
    type: [slotSchema],
    validate: {
      validator: function (slots) {
        return this.slot_type === 'fixed' ? slots.length > 0 : slots.length === 0;
      },
      message: 'Fixed slots must be provided if slot_type is fixed, and should be empty otherwise.',
    },
  },
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
