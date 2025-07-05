const multer = require('multer');
const ExcelJS = require('exceljs');
const Papa = require('papaparse');
const Teacher = require('../models/teacher');
const Subject = require('../models/subject');
const Room = require('../models/room');
const FixedSlot = require('../models/OP_TimeTable');

// Define required columns for each file type
const REQUIRED_COLUMNS = {
  teachers: ['mis_id', 'name', 'email', 'designation', 'subject_preferences'],
  subjects: ['code', 'name', 'department', 'semester', 'weekly_load'],
  rooms: ['room_no', 'capacity', 'room_type', 'equipment'],
  'fixed-slots': ['division', 'day', 'period', 'teacher', 'room', 'subject'],
};

module.exports = (upload) => {
const parseFile = async (file, fileType) => {
  if (fileType === 'xlsx') {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.getWorksheet(1);
    const data = [];
    const header = [];

    // Extract header
    worksheet.getRow(1).eachCell({ includeEmpty: false }, (cell) => {
      header.push(cell.value);
    });

    // Extract data, skipping header row
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber !== 1) { // Skip header row
        const rowData = {};
        row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
          rowData[header[colNumber - 1]] = cell.value;
        });
        data.push(rowData);
      }
    });
    return { header, data };
  } else if (fileType === 'csv') {
    return new Promise((resolve, reject) => {
      Papa.parse(file.buffer.toString(), {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const header = results.meta.fields;
          const data = results.data;
          resolve({ header, data });
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  } else {
    throw new Error('Unsupported file type');
  }
};

  const validateHeaders = (actualHeaders, requiredHeaders, fileTypeName) => {
    const missingHeaders = requiredHeaders.filter(col => !actualHeaders.includes(col));
    if (missingHeaders.length > 0) {
      throw new Error(`${fileTypeName} file is missing required fields: ${missingHeaders.join(', ')}`);
    }
  };

  const uploadTeachers = [upload.single('teachersFile'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

      const fileExtension = req.file.originalname.split('.').pop();
       const { header, data: teachersData } = await parseFile(req.file, fileExtension);
      validateHeaders(header, REQUIRED_COLUMNS.teachers, 'Teachers');

      teachersData.forEach(teacher => {
        if (typeof teacher.subject_preferences === 'string') {
          teacher.subject_preferences = teacher.subject_preferences.split(',').map(s => s.trim());
        }
      });

      console.log('Parsed Teachers Headers:', header);
      console.log('Parsed Teachers Data (first 5 rows):', teachersData.slice(0, 5));

      await Teacher.insertMany(teachersData);
      res.status(200).json({ message: 'Teachers file uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading teachers data:', error);
      if (error.message.includes('Unsupported file type') || error.message.includes('missing required fields')) {
        return res.status(400).json({ error: error.message });
      } else if (error.code === 11000) { // Duplicate key error
        return res.status(409).json({ error: 'Duplicate entry found. mis_id or email might already exist.' });
      } else if (error.name === 'ValidationError') { // Mongoose validation error
        return res.status(400).json({ error: `Schema validation failed: ${error.message}` });
      }
      res.status(500).json({ error: 'Error uploading teachers data', details: error.message });
    }
  }];

  const uploadSubjects = [upload.single('subjectsFile'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

      const fileExtension = req.file.originalname.split('.').pop();
       const { header, data: subjectsData } = await parseFile(req.file, fileExtension);
      validateHeaders(header, REQUIRED_COLUMNS.subjects, 'Subjects');

      // No special parsing needed for weekly_load as it's stored as a string in the model
      // subjectsData.forEach(subject => {
      //   if (typeof subject.weekly_load === 'string') {
      //     const [theory, lab] = subject.weekly_load.split(',').map(Number);
      //     subject.weekly_load = { theory, lab };
      //   }
      // });

      console.log('Parsed Subjects Headers:', header);
      console.log('Parsed Subjects Data (first 5 rows):', subjectsData.slice(0, 5));

      await Subject.insertMany(subjectsData);
      res.status(200).json({ message: 'Subjects file uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading subjects data:', error);
      if (error.message.includes('Unsupported file type') || error.message.includes('missing required fields')) {
        return res.status(400).json({ error: error.message });
      } else if (error.code === 11000) { // Duplicate key error
        return res.status(409).json({ error: 'Duplicate entry found. Code might already exist.' });
      } else if (error.name === 'ValidationError') { // Mongoose validation error
        return res.status(400).json({ error: `Schema validation failed: ${error.message}` });
      }
      res.status(500).json({ error: 'Error uploading subjects data', details: error.message });
    }
  }];

  const uploadRooms = [upload.single('roomsFile'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

      const fileExtension = req.file.originalname.split('.').pop();
       const { header, data: roomsData } = await parseFile(req.file, fileExtension);
      validateHeaders(header, REQUIRED_COLUMNS.rooms, 'Rooms');

      roomsData.forEach(room => {
        if (typeof room.equipment === 'string') {
          room.equipment = room.equipment.split(',').map(e => e.trim());
        }
      });

      console.log('Parsed Rooms Headers:', header);
      console.log('Parsed Rooms Data (first 5 rows):', roomsData.slice(0, 5));

      await Room.insertMany(roomsData);
      res.status(200).json({ message: 'Rooms file uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading rooms data:', error);
      if (error.message.includes('Unsupported file type') || error.message.includes('missing required fields')) {
        return res.status(400).json({ error: error.message });
      } else if (error.code === 11000) { // Duplicate key error
        return res.status(409).json({ error: 'Duplicate entry found. Room number might already exist.' });
      } else if (error.name === 'ValidationError') { // Mongoose validation error
        return res.status(400).json({ error: `Schema validation failed: ${error.message}` });
      }
      res.status(500).json({ error: 'Error uploading rooms data', details: error.message });
    }
  }];

  const uploadFixedSlots = [upload.single('fixedSlotFile'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

      const fileExtension = req.file.originalname.split('.').pop();
       const { header, data: fixedSlotsData } = await parseFile(req.file, fileExtension);
      validateHeaders(header, REQUIRED_COLUMNS['fixed-slots'], 'Fixed Slots');

      console.log('Parsed Fixed Slots Headers:', header);
      console.log('Parsed Fixed Slots Data (first 5 rows):', fixedSlotsData.slice(0, 5));

      // Assuming 'FixedSlot' is the correct model for fixed slots data based on previous review
      // If 'Division' is intended for something else, this needs to be adjusted.
      const FixedSlot = require('../models/OP_TimeTable'); // Assuming OP_TimeTable.js exports FixedSlot model
      await FixedSlot.insertMany(fixedSlotsData);
      res.status(200).json({ message: 'Fixed slots file uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading fixed slots data:', error);
      if (error.message.includes('Unsupported file type') || error.message.includes('missing required fields')) {
        return res.status(400).json({ error: error.message });
      } else if (error.code === 11000) { // Duplicate key error
        return res.status(409).json({ error: 'Duplicate entry found for fixed slot.' });
      } else if (error.name === 'ValidationError') { // Mongoose validation error
        return res.status(400).json({ error: `Schema validation failed: ${error.message}` });
      }
      res.status(500).json({ error: 'Error uploading fixed slots data', details: error.message });
    }
  }];

  return {
    uploadTeachers,
    uploadSubjects,
    uploadRooms,
    uploadFixedSlots,
  };
};
