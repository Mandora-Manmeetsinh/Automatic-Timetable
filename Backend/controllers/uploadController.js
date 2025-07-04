const multer = require('multer');
const ExcelJS = require('exceljs');
const Papa = require('papaparse');
const Teacher = require('../models/teacher');
const Subject = require('../models/subject');
const Room = require('../models/room');
const Division = require('../models/division');

module.exports = (upload) => {
  const parseFile = async (fileBuffer, fileType) => {
    if (fileType === 'csv') {
      return new Promise((resolve, reject) => {
        Papa.parse(fileBuffer.toString(), {
          header: true,
          complete: (results) => {
            if (results.errors.length) {
              return reject(results.errors);
            }
            console.log(`Parsed ${results.data.length} rows from CSV.`);
            resolve(results.data);
          },
          error: (err) => reject(err),
        });
      });
    } else if (fileType === 'xlsx' || fileType === 'xls') {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(fileBuffer);
      const worksheet = workbook.worksheets[0];
      const jsonData = [];
      const header = worksheet.getRow(1).values;
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[header[colNumber - 1]] = cell.value; // Adjust colNumber for 0-indexed header
        });
        jsonData.push(rowData);
      });
      console.log(`Parsed ${jsonData.length} rows from XLSX.`);
      return jsonData;
    } else {
      throw new Error(`Unsupported file type: ${fileType}. Only .csv and .xlsx are allowed.`);
    }
  };

  const uploadTeachers = [upload.single('teachersFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const fileExtension = req.file.originalname.split('.').pop();
      const teachersData = await parseFile(req.file.buffer, fileExtension);
      await Teacher.insertMany(teachersData);
      // Since multer.memoryStorage() is used, the file is in buffer and will be garbage collected.
      res.status(200).json({ message: 'Teachers file uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading teachers data:', error);
      if (error.message.includes('Unsupported file type')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Error uploading teachers data' });
    }
  }];

  const uploadSubjects = [upload.single('subjectsFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const fileExtension = req.file.originalname.split('.').pop();
      const subjectsData = await parseFile(req.file.buffer, fileExtension);
      await Subject.insertMany(subjectsData);
      res.status(200).json({ message: 'Subjects data uploaded successfully', data: subjectsData });
    } catch (error) {
      console.error('Error uploading subjects data:', error);
      res.status(500).json({ message: 'Error uploading subjects data', error: error.message });
    }
  }];

  const uploadRooms = [upload.single('roomsFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const fileExtension = req.file.originalname.split('.').pop();
      const roomsData = await parseFile(req.file.buffer, fileExtension);
      await Room.insertMany(roomsData);
      res.status(200).json({ message: 'Rooms data uploaded successfully', data: roomsData });
    } catch (error) {
      console.error('Error uploading rooms data:', error);
      res.status(500).json({ message: 'Error uploading rooms data', error: error.message });
    }
  }];

  const uploadFixedSlots = [upload.single('fixedSlotFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const fileExtension = req.file.originalname.split('.').pop();
      const fixedSlotsData = await parseFile(req.file.buffer, fileExtension);
      await Division.insertMany(fixedSlotsData); // Assuming 'Division' model is used for fixed slots
      res.status(200).json({ message: 'Fixed slots data uploaded successfully', data: fixedSlotsData });
    } catch (error) {
      console.error('Error uploading fixed slots data:', error);
      res.status(500).json({ message: 'Error uploading fixed slots data', error: error.message });
    }
  }];

  return {
    uploadTeachers,
    uploadSubjects,
    uploadRooms,
    uploadFixedSlots,
  };
};