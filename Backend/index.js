const dotenv = require("dotenv")
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const Papa = require('papaparse');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Multer config
const upload = multer({ dest: 'uploads/' });

const parseFile = async (filePath) => {
  const ext = path.extname(filePath);
  if (ext === '.csv') {
    const content = fs.readFileSync(filePath, 'utf8');
    return new Promise((resolve, reject) => {
      Papa.parse(content, {
        header: true,
        complete: (results) => resolve(results.data),
        error: (err) => reject(err),
      });
    });
  } else {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    const data = [];
    worksheet.eachRow((row) => {
      data.push(row.values);
    });
    return data;
  }
};

const uploadHandler = async (req, res) => {
  try {
    const type = req.params.type;
    let file;
    if (type === 'teachers') {
      file = req.files.find(f => f.fieldname === 'teachersFile');
    } else {
      file = req.files.find(f => f.fieldname === 'file');
    }

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded or incorrect field name.' });
    }

    const data = await parseFile(file.path);
    fs.unlinkSync(file.path); // Delete after processing

    res.status(200).json({ message: 'Uploaded successfully' });
  } catch (err) {
    console.error(`Error processing ${req.params.type} file:`, err);
    res.status(500).json({ message: `Error processing ${req.params.type} file: ${err.message}` });
  }
};

app.post('/api/upload/:type', upload.any(), uploadHandler);

app.listen(PORT, () => {
  console.log(`TRAE AI backend running on http://localhost:${PORT}`);
});