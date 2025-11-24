import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Upload, FileText, AlertCircle, Users, BookOpen, Layout, Calendar, Download, Play } from 'lucide-react';

const Spinner = () => (
  <div className="flex items-center justify-center">
    <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  </div>
);

const FileUploadPage = ({ onBack, onFilesUploaded }) => {
  const [draggedOver, setDraggedOver] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({
    0: null, // Teachers
    1: null, // Subjects
    2: null, // Rooms
    3: null  // Fixed Slots
  });
  const [processing, setProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});

  // Mapped to match the user's design style but keeping app logic
  const fileTypes = [
    { label: 'Teachers Data', icon: Users, desc: 'Faculty details & preferences (.csv)', required: true },
    { label: 'Subject Schedules', icon: BookOpen, desc: 'Course codes & loads (.csv)', required: true },
    { label: 'Room Availability', icon: Layout, desc: 'Capacity & equipment (.csv)', required: true },
    { label: 'Fixed Slots', icon: Calendar, desc: 'Pre-assigned schedules (.csv)', required: true }
  ];

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOver(index);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setDraggedOver(null);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) processFile(files[0], index);
  };

  const handleFileSelect = (e, index) => {
    const files = e.target.files;
    if (files && files.length > 0) processFile(files[0], index);
  };

  const processFile = (file, index) => {
    if (isValidFileType(file)) {
      setUploadedFiles(prev => ({ ...prev, [index]: file }));
      simulateUpload(index);
    } else {
      alert('Please upload only CSV or Excel files (.csv, .xlsx, .xls)');
    }
  };

  const simulateUpload = (index) => {
    setUploadStatus(prev => ({ ...prev, [index]: 'uploading' }));
    setTimeout(() => {
      setUploadStatus(prev => ({ ...prev, [index]: 'completed' }));
    }, 1500 + Math.random() * 1000);
  };

  const isValidFileType = (file) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    return validTypes.includes(file.type) || validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const processFiles = () => {
    const filesToProcess = Object.values(uploadedFiles).filter(Boolean);
    if (filesToProcess.length === 4) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        if (onFilesUploaded) onFilesUploaded(uploadedFiles);
      }, 2000);
    }
  };

  const allFilesUploaded = () => Object.values(uploadedFiles).every(file => file !== null);
  const allFilesCompleted = () => Object.keys(uploadedFiles).every(index => uploadedFiles[index] && uploadStatus[index] === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

      <div className="max-w-[960px] mx-auto px-4 md:px-10 py-8 flex flex-col min-h-screen">

        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-bold text-gray-900">Session #2024-A1</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="flex flex-col gap-3 mb-12">
          <h1 className="text-4xl font-light leading-tight tracking-wide" style={{ fontFamily: '"Julius Sans One", sans-serif' }}>
            UPLOAD TIMETABLE DATA
          </h1>
          <p className="text-gray-500 text-base font-normal leading-normal">
            Drag and drop the required files into the designated areas below to begin.
          </p>
        </div>

        {/* Upload Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {fileTypes.map((type, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`relative flex flex-col items-center gap-6 rounded-xl border transition-all duration-300 group py-14 px-6
                  ${draggedOver === index ? 'border-black bg-gray-100 scale-[1.02]' :
                    uploadedFiles[index] && uploadStatus[index] === 'completed' ? 'border-green-500 bg-green-50' :
                      'border-dashed border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
              >
                <input
                  type="file"
                  id={`file-${index}`}
                  accept=".csv,.xlsx,.xls"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={(e) => handleFileSelect(e, index)}
                  disabled={uploadStatus[index] === 'uploading'}
                />

                {uploadedFiles[index] ? (
                  <>
                    <div className={`p-4 rounded-full ${uploadStatus[index] === 'uploading' ? 'bg-blue-50 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      {uploadStatus[index] === 'uploading' ? <Spinner /> : <CheckCircle size={32} />}
                    </div>
                    <div className="flex max-w-[480px] flex-col items-center gap-2 z-10">
                      <p className="text-lg font-bold leading-tight tracking-tight text-center">{type.label}</p>
                      <p className={`text-sm font-normal leading-normal text-center ${uploadStatus[index] === 'uploading' ? 'text-blue-600' : 'text-green-600'}`}>
                        {uploadStatus[index] === 'uploading' ? 'Uploading...' : `${uploadedFiles[index].name} uploaded successfully.`}
                      </p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 px-4 bg-white border border-gray-200 text-gray-900 text-sm font-bold tracking-wide hover:bg-gray-50 transition-colors z-10 shadow-sm">
                      {uploadStatus[index] === 'uploading' ? 'Wait...' : 'Replace File'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-full bg-gray-50 text-gray-400 group-hover:text-black group-hover:bg-gray-100 transition-colors">
                      <type.icon size={32} />
                    </div>
                    <div className="flex max-w-[480px] flex-col items-center gap-2">
                      <p className="text-lg font-bold leading-tight tracking-tight text-center">{type.label}</p>
                      <p className="text-sm font-normal leading-normal text-center text-gray-500">
                        {type.desc}
                      </p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 px-4 bg-black text-white text-sm font-bold tracking-wide hover:bg-gray-800 transition-colors shadow-sm">
                      Select File
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Code Block Section */}
        <div className="flex flex-col gap-6 mb-12">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Required File Structure</h3>
            <p className="text-gray-500 mt-2">Ensure your data adheres to the following CSV structure. All files must use UTF-8 encoding.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl overflow-x-auto border border-gray-800 shadow-lg">
            <pre className="text-sm leading-relaxed text-gray-300 font-mono">
              <code>
                <span className="text-green-400 font-bold"># teachers.csv</span>
                {`id,name,email,designation,preferences
T001,Dr. Smith,smith@uni.edu,Professor,"Math,Physics"
...`}

                <span className="text-blue-400 font-bold"># subjects.csv</span>
                {`code,name,department,semester,weekly_load
CS101,Intro to CS,CS,1,4
...`}

                <span className="text-purple-400 font-bold"># rooms.csv</span>
                {`room_no,capacity,type,equipment
R101,60,Lecture Hall,"Projector,Whiteboard"
...`}

                <span className="text-yellow-400 font-bold"># fixed_slots.csv</span>
                {`division,day,period,teacher_id,room_no
A,Monday,1,T001,R101
...`}
              </code>
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto flex flex-col md:flex-row items-center justify-between gap-6 p-4 border-t border-gray-200">
          <button className="flex w-full md:w-auto min-w-[84px] items-center justify-center rounded-lg h-10 px-6 bg-white border border-gray-200 text-gray-900 text-sm font-bold tracking-wide gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={18} />
            <span>Download Sample Data</span>
          </button>

          <button
            onClick={processFiles}
            disabled={!allFilesUploaded() || !allFilesCompleted() || processing}
            className={`flex w-full md:w-auto min-w-[84px] items-center justify-center rounded-lg h-12 px-8 text-base font-bold tracking-wide transition-all
              ${allFilesUploaded() && allFilesCompleted()
                ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <Spinner /> Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Play size={18} fill="currentColor" /> Generate Timetable
              </span>
            )}
          </button>
        </div>

        <div className="text-center mt-6 pb-8">
          <a href="#" className="text-sm text-gray-400 hover:text-black underline decoration-1 underline-offset-4 transition-colors">
            Need help? View Documentation
          </a>
        </div>

      </div>
    </div>
  );
};

export default FileUploadPage;