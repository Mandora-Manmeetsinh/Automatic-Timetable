const mongoose = require("mongoose");

const con = mongoose
  .connect("mongodb://localhost:27017/AUTO_TIMETABLE")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = con;

/**
 mongoose.connect('mongodb://localhost:27017/tabularDSA', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

 */
