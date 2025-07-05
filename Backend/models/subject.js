const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  weekly_load: { type: String, required: true } // format: "3,1" (theory, lab)
});

module.exports = mongoose.model('Subject', subjectSchema);
