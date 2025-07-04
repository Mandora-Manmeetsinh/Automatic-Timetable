const express = require('express');
const router = express.Router();

module.exports = (upload) => {
  const uploadController = require('../controllers/uploadController')(upload);

  router.post('/upload/teachers', uploadController.uploadTeachers);
  router.post('/upload/subjects', uploadController.uploadSubjects);
  router.post('/upload/rooms', uploadController.uploadRooms);
  router.post('/upload/fixed-slots', uploadController.uploadFixedSlots);

  return router;
};