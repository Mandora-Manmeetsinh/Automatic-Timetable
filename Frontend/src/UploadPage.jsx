import React, { useState } from 'react';
import './UploadPage.css';

const UploadPage = () => {
  const [teacherFile, setTeacherFile] = useState(null);
  const [subjectFile, setSubjectFile] = useState(null);
  const [roomFile, setRoomFile] = useState(null);
  const [fixedSlotFile, setFixedSlotFile] = useState(null);

  const handleFileChange = (setter) => (event) => {
    setter(event.target.files[0]);
  };

  const handleUpload = async (file, type) => {
    if (!file) {
      alert('No file selected.');
      return;
    }

    const formData = new FormData();

    // Correct field names expected by Multer
    const fieldMap = {
      teachers: 'teachersFile',
      subjects: 'subjectsFile',
      rooms: 'roomsFile',
      'fixed-slots': 'fixedSlotFile',
    };

    const fieldName = fieldMap[type];
    if (!fieldName) {
      alert('Invalid upload type');
      return;
    }

    formData.append(fieldName, file);

    try {
      const response = await fetch(`http://localhost:5001/api/upload/${type}`, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (response.ok) {
        alert(data.message || 'File uploaded successfully!');
        console.log(data);
      } else {
        const errorMessage = data.error || data.message || `Failed to upload ${type} file.`;
        console.error(`Error uploading ${type} file:`, errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error(`Network error while uploading ${type} file:`, error);
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="upload-page-container">
      <h1>Upload Your Timetable Data</h1>
      <div className="upload-sections">

        {/* Teachers */}
        <div className="upload-card">
          <div className="file-icon">📄</div>
          <h3>Teachers File</h3>
          <input
            type="file"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange(setTeacherFile)}
            className="file-input"
            id="teacherFile"
          />
          <label htmlFor="teacherFile" className="upload-button">
            {teacherFile ? teacherFile.name : 'Choose File'}
          </label>
          <button
            onClick={() => handleUpload(teacherFile, 'teachers')}
            className="upload-button"
            disabled={!teacherFile}
          >
            Upload
          </button>
        </div>

        {/* Subjects */}
        <div className="upload-card">
          <div className="file-icon">📄</div>
          <h3>Subjects File</h3>
          <input
            type="file"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange(setSubjectFile)}
            className="file-input"
            id="subjectFile"
          />
          <label htmlFor="subjectFile" className="upload-button">
            {subjectFile ? subjectFile.name : 'Choose File'}
          </label>
          <button
            onClick={() => handleUpload(subjectFile, 'subjects')}
            className="upload-button"
            disabled={!subjectFile}
          >
            Upload
          </button>
        </div>

        {/* Rooms */}
        <div className="upload-card">
          <div className="file-icon">📄</div>
          <h3>Rooms File</h3>
          <input
            type="file"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange(setRoomFile)}
            className="file-input"
            id="roomFile"
          />
          <label htmlFor="roomFile" className="upload-button">
            {roomFile ? roomFile.name : 'Choose File'}
          </label>
          <button
            onClick={() => handleUpload(roomFile, 'rooms')}
            className="upload-button"
            disabled={!roomFile}
          >
            Upload
          </button>
        </div>

        {/* Fixed Slots */}
        <div className="upload-card">
          <div className="file-icon">📄</div>
          <h3>Fixed Slots File</h3>
          <input
            type="file"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange(setFixedSlotFile)}
            className="file-input"
            id="fixedSlotFile"
          />
          <label htmlFor="fixedSlotFile" className="upload-button">
            {fixedSlotFile ? fixedSlotFile.name : 'Choose File'}
          </label>
          <button
            onClick={() => handleUpload(fixedSlotFile, 'fixed-slots')}
            className="upload-button"
            disabled={!fixedSlotFile}
          >
            Upload
          </button>
        </div>
      </div>

      <button className="next-step-button">Next Step</button>
    </div>
  );
};

export default UploadPage;
