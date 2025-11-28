import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import { Menu } from 'lucide-react';
import SearchBar from './components/SearchBar.jsx';
import Dashboard from './components/Dashboard.jsx';
import RecordList from './components/RecordList.jsx';
import FileUploadPage from './components/FileUploadPage.jsx';
import TeacherAssignmentPage from './components/TeacherAssignmentPage.jsx';
import BatchManagementPage from './components/BatchManagementPage.jsx';
import TimetableOutputPage from './components/TimetableOutputPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [appState, setAppState] = useState({
        uploadedFiles: null,
        teacherAssignments: null,
        batchAssignments: null,
        generatedTimetable: null
    });
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

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
    const handleBatchManagementComplete = async (batchAssignments) => {
        try {
            const response = await fetch('http://localhost:3000/api/generate-timetable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ batchAssignments }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate timetable');
            }

            const generatedTimetable = await response.json();
            setAppState(prev => ({
                ...prev,
                batchAssignments,
                generatedTimetable
            }));
            setCurrentPage('timetable-output');
        } catch (error) {
            console.error('Error generating timetable:', error);
            alert('Failed to generate timetable: ' + error.message);
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
            case 'profile':
                setCurrentPage(page);
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
        case 'profile':
            return (
                <ProfilePage
                    onBack={() => setCurrentPage('dashboard')}
                />
            );

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
                <div className="min-h-screen flex bg-[#f8f7f5]">
                    {/* Hamburger menu for opening sidebar */}
                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="fixed top-4 left-4 z-30 text-gray-700 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition md:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    )}
                    <Sidebar
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        currentPage={currentPage}
                        onPageChange={handleSidebarNavigation}
                        appState={appState}
                    />
                    <main
                        className={`
              flex-1 flex flex-col
              transition-all duration-300
              ${sidebarOpen ? 'ml-64' : 'ml-0'}
              md:ml-64
            `}
                    >
                        <Dashboard
                            onGetStarted={() => setCurrentPage('upload')}
                            appState={appState}
                            onReset={handleReset}
                            onNavigate={handleSidebarNavigation}
                        />
                    </main>
                </div>
            );
    }
}

export default App;