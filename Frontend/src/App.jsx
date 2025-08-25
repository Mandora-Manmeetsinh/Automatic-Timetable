import React from 'react';
import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import SearchBar from './components/SearchBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import RecordList from './components/RecordList.jsx';
import FileUploadPage from './components/FileUploadPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (currentPage === 'upload') {
    return <FileUploadPage onBack={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white">
        <SearchBar />
        <HeroSection onGetStarted={() => setCurrentPage('upload')} />
        <RecordList />
      </div>
    </div>
  );
}

export default App;