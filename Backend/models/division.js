const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    // Add other division-specific fields as needed
});

module.exports = mongoose.model('Division', divisionSchema);