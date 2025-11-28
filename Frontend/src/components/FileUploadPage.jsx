import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Upload, FileText, AlertCircle, Users, BookOpen, Layout, Calendar, Download, Play, Activity, Clock } from 'lucide-react';

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
  const [healthScore, setHealthScore] = useState(0);

  // Mapped to match the user's design style but keeping app logic
  const fileTypes = [
    { label: 'Teachers Data', icon: Users, desc: 'Faculty details & preferences (.csv)', required: true },
    { label: 'Subject Schedules', icon: BookOpen, desc: 'Course codes & loads (.csv)', required: true },
    { label: 'Room Availability', icon: Layout, desc: 'Capacity & equipment (.csv)', required: true },
    { label: 'Fixed Slots', icon: Calendar, desc: 'Pre-assigned schedules (.csv)', required: true }
  ];

  useEffect(() => {
    // Calculate mock health score based on uploaded files
    const uploadedCount = Object.values(uploadedFiles).filter(Boolean).length;
    setHealthScore(uploadedCount * 25);
  }, [uploadedFiles]);

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
    <div className="flex-1 p-8 bg-[#f8f7f5] min-h-screen font-['Space_Grotesk'] text-[#1c140d] overflow-y-auto">
      {/* Google Fonts Link */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-[#9c7349] hover:text-[#1c140d] transition-colors font-bold">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#e8dbce] shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-bold text-[#1c140d] uppercase tracking-wider">Session #2024-A1</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content - Upload Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">Upload Data</h1>
              <p className="text-[#9c7349] text-base font-normal">
                Drag and drop your CSV files to initialize the scheduling engine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fileTypes.map((type, index) => (
                <div key={index} className="flex flex-col">
                  <div
                    className={`relative flex flex-col items-center gap-4 rounded-xl border-2 transition-all duration-300 group py-10 px-6 cursor-pointer
                      ${draggedOver === index ? 'border-[#f48c25] bg-[#fff8f1] scale-[1.02]' :
                        uploadedFiles[index] && uploadStatus[index] === 'completed' ? 'border-green-500 bg-green-50' :
                          'border-dashed border-[#e8dbce] hover:border-[#f48c25] bg-white hover:shadow-md'
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
                        <div className={`p-3 rounded-full ${uploadStatus[index] === 'uploading' ? 'bg-blue-50 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                          {uploadStatus[index] === 'uploading' ? <Spinner /> : <CheckCircle size={24} />}
                        </div>
                        <div className="flex flex-col items-center gap-1 z-10">
                          <p className="text-base font-bold text-[#1c140d] text-center">{type.label}</p>
                          <p className={`text-xs font-bold text-center ${uploadStatus[index] === 'uploading' ? 'text-blue-600' : 'text-green-600'}`}>
                            {uploadStatus[index] === 'uploading' ? 'Uploading...' : 'Uploaded'}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 rounded-full bg-[#f8f7f5] text-[#9c7349] group-hover:text-[#f48c25] group-hover:bg-[#fff8f1] transition-colors">
                          <type.icon size={24} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <p className="text-base font-bold text-[#1c140d] text-center">{type.label}</p>
                          <p className="text-xs text-[#9c7349] text-center max-w-[150px]">
                            {type.desc}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#e8dbce]">
              <button className="flex items-center gap-2 text-[#9c7349] hover:text-[#f48c25] transition-colors text-sm font-bold">
                <Download size={16} />
                <span>Download Sample Templates</span>
              </button>

              <button
                onClick={processFiles}
                disabled={!allFilesUploaded() || !allFilesCompleted() || processing}
                className={`flex items-center justify-center rounded-lg h-12 px-8 text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200
                  ${allFilesUploaded() && allFilesCompleted()
                    ? 'bg-[#f48c25] text-white hover:bg-[#d6761b]'
                    : 'bg-[#e8dbce] text-[#9c7349] cursor-not-allowed shadow-none transform-none'}`}
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Play size={16} fill="currentColor" /> Generate Timetable
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Right Sidebar - New Features */}
          <div className="lg:col-span-1 space-y-6">

            {/* Data Health Check */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e8dbce]">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={20} className="text-[#f48c25]" />
                <h3 className="text-lg font-bold text-[#1c140d]">Data Health</h3>
              </div>

              <div className="flex items-center justify-center mb-4 relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    className="text-[#f8f7f5]"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-[#f48c25] transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={351.86}
                    strokeDashoffset={351.86 - (351.86 * healthScore) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-[#1c140d]">{healthScore}%</span>
                  <span className="text-[10px] font-bold text-[#9c7349] uppercase">Score</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#9c7349]">
                  <CheckCircle size={12} className={uploadedFiles[0] ? "text-green-500" : "text-gray-300"} />
                  <span>Faculty records validated</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#9c7349]">
                  <CheckCircle size={12} className={uploadedFiles[1] ? "text-green-500" : "text-gray-300"} />
                  <span>Course codes consistent</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#9c7349]">
                  <CheckCircle size={12} className={uploadedFiles[2] ? "text-green-500" : "text-gray-300"} />
                  <span>Room capacities checked</span>
                </div>
              </div>
            </div>

            {/* Recent Uploads */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e8dbce]">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-[#9c7349]" />
                <h3 className="text-lg font-bold text-[#1c140d]">Recent Uploads</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#fff8f1] rounded-lg text-[#f48c25]">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1c140d]">Fall_2023_Final.csv</p>
                    <p className="text-xs text-[#9c7349]">2 days ago • 1.2 MB</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#fff8f1] rounded-lg text-[#f48c25]">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1c140d]">Teachers_List_V2.xlsx</p>
                    <p className="text-xs text-[#9c7349]">5 days ago • 450 KB</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#fff8f1] rounded-lg text-[#f48c25]">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1c140d]">Rooms_Config.csv</p>
                    <p className="text-xs text-[#9c7349]">1 week ago • 120 KB</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 py-2 text-xs font-bold text-[#f48c25] hover:bg-[#fff8f1] rounded-lg transition-colors">
                View All History
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;