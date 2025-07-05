const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  mis_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  subject_preferences: [{ type: String }] // list of subject codes in priority order
});

module.exports = mongoose.model('Teacher', teacherSchema);
