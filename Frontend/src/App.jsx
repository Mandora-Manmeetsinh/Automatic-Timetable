import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import SearchBar from './components/SearchBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import RecordList from './components/RecordList.jsx';
import FileUploadPage from './components/FileUploadPage.jsx';
import TeacherAssignmentPage from './components/TeacherAssignmentPage.jsx';
import BatchManagementPage from './components/BatchManagementPage.jsx';
import TimetableOutputPage from './components/TimetableOutputPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [appState, setAppState] = useState({
    uploadedFiles: null,
    teacherAssignments: null,
    batchAssignments: null,
    generatedTimetable: null
  });

  // Handle file upload completion - Step 1 to Step 2
  const handleFilesUploaded = (files) => {
    setAppState(prev => ({ ...prev, uploadedFiles: files }));
    setCurrentPage('teacher-assignment');
  };

  // Handle teacher assignment completion - Step 2 to Step 3
  const handleTeacherAssignmentComplete = (assignments) => {
    setAppState(prev => ({ ...prev, teacherAssignments: assignments }));
    setCurrentPage('batch-management');
  };

  // Handle batch management completion - Step 3 to Step 4
  const handleBatchManagementComplete = (batchAssignments) => {
    setAppState(prev => ({ ...prev, batchAssignments }));
    
    // Generate timetable automatically
    generateTimetable(batchAssignments);
    setCurrentPage('timetable-output');
  };

  // Generate final timetable using the algorithm
  const generateTimetable = async (batchAssignments) => {
    try {
      // In a real implementation, this would call the backend
      // For now, we'll simulate the process
      console.log('Generating timetable with data:', {
        files: appState.uploadedFiles,
        teachers: appState.teacherAssignments,
        batches: batchAssignments
      });

      // Simulate processing time
      setTimeout(() => {
        const generatedTimetable = {
          success: true,
          timestamp: new Date().toISOString(),
          statistics: {
            totalSubjects: 6,
            totalTeachers: 4,
            totalClasses: 3,
            totalHours: 42,
            utilizationRate: 85
          }
        };
        
        setAppState(prev => ({ ...prev, generatedTimetable }));
      }, 1000);
    } catch (error) {
      console.error('Error generating timetable:', error);
    }
  };

  // Reset application state
  const handleReset = () => {
    setAppState({
      uploadedFiles: null,
      teacherAssignments: null,
      batchAssignments: null,
      generatedTimetable: null
    });
    setCurrentPage('dashboard');
  };

  // Navigation handlers for sidebar
  const handleSidebarNavigation = (page) => {
    // Only allow navigation to completed steps
    switch (page) {
      case 'dashboard':
        setCurrentPage('dashboard');
        break;
      case 'upload':
        setCurrentPage('upload');
        break;
      case 'teacher-assignment':
        if (appState.uploadedFiles) {
          setCurrentPage('teacher-assignment');
        } else {
          alert('Please upload files first');
        }
        break;
      case 'batch-management':
        if (appState.teacherAssignments) {
          setCurrentPage('batch-management');
        } else {
          alert('Please complete teacher assignments first');
        }
        break;
      case 'timetable-output':
        if (appState.generatedTimetable) {
          setCurrentPage('timetable-output');
        } else {
          alert('Please complete all previous steps first');
        }
        break;
      default:
        // For other menu items, show coming soon
        alert(`${page} feature coming soon!`);
    }
  };

  // Render different pages based on currentPage state
  switch (currentPage) {
    case 'upload':
      return (
        <FileUploadPage 
          onBack={() => setCurrentPage('dashboard')} 
          onFilesUploaded={handleFilesUploaded}
          existingFiles={appState.uploadedFiles}
        />
      );

    case 'teacher-assignment':
      return (
        <TeacherAssignmentPage 
          onBack={() => setCurrentPage('upload')}
          onNext={handleTeacherAssignmentComplete}
          uploadedFiles={appState.uploadedFiles}
          existingAssignments={appState.teacherAssignments}
        />
      );

    case 'batch-management':
      return (
        <BatchManagementPage 
          onBack={() => setCurrentPage('teacher-assignment')}
          onNext={handleBatchManagementComplete}
          teacherAssignments={appState.teacherAssignments}
          existingAssignments={appState.batchAssignments}
        />
      );

    case 'timetable-output':
      return (
        <TimetableOutputPage 
          onBack={() => setCurrentPage('batch-management')}
          generatedTimetable={appState.generatedTimetable}
          onReset={handleReset}
        />
      );

    default:
      // Default dashboard view
      return (
        <div className="min-h-screen bg-white flex">
          <Sidebar 
            currentPage={currentPage} 
            onPageChange={handleSidebarNavigation}
            appState={appState}
          />
          <div className="flex-1 ml-64 p-8 bg-white">
            <SearchBar />
            <HeroSection 
              onGetStarted={() => setCurrentPage('upload')}
              appState={appState}
              onReset={handleReset}
            />
            <RecordList appState={appState} />
          </div>
        </div>
      );
  }
}

export default App;