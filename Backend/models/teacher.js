const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    assignedSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject', default: [] }]
});

module.exports = mongoose.model('Teacher', teacherSchema);