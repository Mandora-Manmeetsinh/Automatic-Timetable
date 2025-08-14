import React, { useState, useEffect } from 'react';
import { Upload, FileSpreadsheet, ArrowLeft, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const Spinner = () => (
  <div className="flex items-center justify-center">
    <svg className="animate-spin h-8 w-8 text-black" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
    </svg>
  </div>
);

const FileUploadPage = ({ onBack }) => {
  const [draggedOver, setDraggedOver] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({
    0: null,
    1: null,
    2: null,
    3: null
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Demo CSV/Excel files for slideshow
  const demoFiles = [
    {
      name: 'Sales_Report_2024.xlsx',
      type: 'Excel Spreadsheet',
      size: '2.4 MB',
      description: 'Annual sales data with quarterly breakdowns',
      preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      rows: '15,847 rows',
      columns: '12 columns'
    },
    {
      name: 'Customer_Database.csv',
      type: 'CSV File',
      size: '1.8 MB',
      description: 'Complete customer information and contact details',
      preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      rows: '8,234 rows',
      columns: '8 columns'
    },
    {
      name: 'Inventory_Management.xlsx',
      type: 'Excel Spreadsheet',
      size: '3.2 MB',
      description: 'Product inventory with stock levels and pricing',
      preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rows: '5,672 rows',
      columns: '15 columns'
    },
    {
      name: 'Financial_Analysis.csv',
      type: 'CSV File',
      size: '4.1 MB',
      description: 'Monthly financial data and expense tracking',
      preview: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400',
      rows: '12,456 rows',
      columns: '10 columns'
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % demoFiles.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, demoFiles.length]);

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
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        setUploadedFiles(prev => ({ ...prev, [index]: file }));
      } else {
        alert('Please upload only CSV or Excel files (.csv, .xlsx, .xls)');
      }
    }
  };

  const handleFileSelect = (e, index) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        setUploadedFiles(prev => ({ ...prev, [index]: file }));
      } else {
        alert('Please upload only CSV or Excel files (.csv, .xlsx, .xls)');
      }
    }
  };

  const isValidFileType = (file) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    return validTypes.includes(file.type) ||
      validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demoFiles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demoFiles.length) % demoFiles.length);
  };

  const clearAllFiles = () => {
    setClearing(true);
    setTimeout(() => {
      setUploadedFiles({
        0: null,
        1: null,
        2: null,
        3: null
      });
      setClearing(false);
    }, 500); // Animation duration
  };

  const processFiles = () => {
    const filesToProcess = Object.values(uploadedFiles).filter(Boolean);
    if (filesToProcess.length > 0) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        alert(`Processing ${filesToProcess.length} CSV/Excel files...`);
      }, 1500); // Simulate processing
    } else {
      alert('Please upload at least one CSV or Excel file to process.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* File Upload Section */}
          <div>
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-black mb-4">Upload Spreadsheets</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Upload your CSV and Excel files for processing. Drag and drop or click to browse.
              </p>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-500 ${clearing ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                    draggedOver === index
                      ? 'border-black bg-gray-50 scale-105'
                      : uploadedFiles[index]
                      ? 'border-black bg-gray-50'
                      : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <input
                    type="file"
                    id={`file-${index}`}
                    accept=".csv,.xlsx,.xls"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => handleFileSelect(e, index)}
                  />

                  {uploadedFiles[index] ? (
                    <div className="text-center animate-fade-in">
                      <FileSpreadsheet className="w-12 h-12 text-black mx-auto mb-4" />
                      <p className="text-black font-semibold text-sm mb-2 truncate">
                        {uploadedFiles[index].name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatFileSize(uploadedFiles[index].size)}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-black font-semibold text-sm mb-2">
                        Upload File {index + 1}
                      </p>
                      <p className="text-gray-500 text-xs">
                        CSV or Excel files only
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Upload Actions */}
            <div className="mt-10 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {Object.values(uploadedFiles).filter(Boolean).length} of 4 files uploaded
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={clearAllFiles}
                  className="px-6 py-3 text-gray-600 hover:text-black font-medium transition-colors"
                  disabled={clearing}
                >
                  {clearing ? (
                    <span className="flex items-center space-x-2">
                      <Spinner />
                      <span>Clearing...</span>
                    </span>
                  ) : (
                    'Clear All'
                  )}
                </button>
                <button
                  onClick={processFiles}
                  className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center"
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center space-x-2">
                      <Spinner />
                      <span>Processing...</span>
                    </span>
                  ) : (
                    'Process Files'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Demo Files Slideshow */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-black mb-4">Sample Data Files</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Explore sample CSV and Excel files to understand supported formats.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              {/* Slideshow Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 text-gray-600 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={prevSlide}
                    className="p-2 text-gray-600 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 text-gray-600 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slideshow Content */}
              <div className="relative h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={demoFiles[currentSlide].preview}
                    alt={demoFiles[currentSlide].name}
                    className="w-full h-full object-cover opacity-20"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <FileSpreadsheet className="w-20 h-20 text-black mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-black mb-3">
                      {demoFiles[currentSlide].name}
                    </h3>
                    <p className="text-gray-600 mb-2 font-medium">
                      {demoFiles[currentSlide].type}
                    </p>
                    <p className="text-gray-500 mb-4 text-sm leading-relaxed max-w-sm mx-auto">
                      {demoFiles[currentSlide].description}
                    </p>
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                      <span>{demoFiles[currentSlide].size}</span>
                      <span>•</span>
                      <span>{demoFiles[currentSlide].rows}</span>
                      <span>•</span>
                      <span>{demoFiles[currentSlide].columns}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slideshow Indicators */}
              <div className="p-6 flex items-center justify-center space-x-3">
                {demoFiles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* File Format Support */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h3 className="text-black font-bold mb-4 text-lg">Supported File Formats</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <FileSpreadsheet className="w-5 h-5 text-black" />
                  <span className="font-medium">CSV Files (.csv)</span>
                  <span className="text-gray-500">- Comma-separated values</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <FileSpreadsheet className="w-5 h-5 text-black" />
                  <span className="font-medium">Excel Files (.xlsx, .xls)</span>
                  <span className="text-gray-500">- Microsoft Excel spreadsheets</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-black">Maximum file size:</strong> 50MB per file
                  <br />
                  <strong className="text-black">Maximum rows:</strong> 1 million rows per file
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fade-in animation for file upload */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  );
};

export default FileUploadPage;