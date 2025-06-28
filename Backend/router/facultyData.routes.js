const express = require('express');
const mongoose = require('mongoose');
const Faculty = require('../models/IP_FacultyData'); // Import Faculty model

const router = express.Router();

/** 📌 1️⃣ Create a Faculty Member */
router.post('/faculties', async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/** 📌 2️⃣ Get All Faculty Members */
router.get('/faculties', async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 📌 3️⃣ Get Faculty by ID */
router.get('/faculties/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 📌 4️⃣ Update Faculty by ID */
router.put('/faculties/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/** 📌 5️⃣ Delete Faculty by ID */
router.delete('/faculties/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 📌 6️⃣ Get Faculties by Department */
router.get('/faculties/department/:department', async (req, res) => {
  try {
    const faculties = await Faculty.find({ department: req.params.department });
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 📌 7️⃣ Get All Fixed Slot Faculties */
router.get('/faculties/fixed', async (req, res) => {
  try {
    const faculties = await Faculty.find({ slot_type: 'fixed' });
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 📌 8️⃣ Get All Dynamic Slot Faculties */
router.get('/faculties/dynamic', async (req, res) => {
  try {
    const faculties = await Faculty.find({ slot_type: 'dynamic' });
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
