import React from 'react';
import { Home, Upload, Users, Calendar, BarChart3, Mail, Bell, Search, Settings, X } from 'lucide-react';

// Add 'isOpen' and 'onClose' props for sidebar control
const Sidebar = ({ currentPage, onPageChange, isOpen = true, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard', active: currentPage === 'dashboard' },
    { icon: Upload, label: 'File Upload', page: 'upload', active: currentPage === 'upload' },
    { icon: Users, label: 'Teacher Assignment', page: 'teacher-assignment', active: currentPage === 'teacher-assignment' },
    { icon: Search, label: 'Search', page: 'search', active: currentPage === 'search' },
  ];

  const handleMenuClick = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Sidebar classes for animation
  const sidebarClasses = `
    w-64 bg-black h-screen fixed left-0 top-0 border-r border-gray-200 z-10
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <div className={sidebarClasses}>
      <div className="p-6 relative">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm"></div>
          </div>
          <span className="text-white font-semibold text-lg">Timetable Gen</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item.page)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                item.active 
                  ? 'bg-white text-black' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Progress Indicator */}
        {(currentPage === 'upload' || currentPage === 'teacher-assignment' || currentPage === 'timetable-output') && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h4 className="text-white font-semibold text-sm mb-3">Progress</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentPage === 'upload' || currentPage === 'teacher-assignment' || currentPage === 'timetable-output'
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  1
                </div>
                <span className={`text-sm ${
                  currentPage === 'upload' || currentPage === 'teacher-assignment' || currentPage === 'timetable-output'
                    ? 'text-green-400' 
                    : 'text-gray-400'
                }`}>
                  File Upload
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentPage === 'teacher-assignment' || currentPage === 'timetable-output'
                    ? 'bg-green-500 text-white' 
                    : currentPage === 'upload'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  2
                </div>
                <span className={`text-sm ${
                  currentPage === 'teacher-assignment' || currentPage === 'timetable-output'
                    ? 'text-green-400' 
                    : currentPage === 'upload'
                    ? 'text-blue-400'
                    : 'text-gray-400'
                }`}>
                  Teacher Assignment
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentPage === 'timetable-output'
                    ? 'bg-green-500 text-white' 
                    : (currentPage === 'teacher-assignment' || currentPage === 'upload')
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  3
                </div>
                <span className={`text-sm ${
                  currentPage === 'timetable-output'
                    ? 'text-green-400' 
                    : (currentPage === 'teacher-assignment' || currentPage === 'upload')
                    ? 'text-blue-400'
                    : 'text-gray-400'
                }`}>
                  Timetable Output
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h4 className="text-white font-semibold text-sm mb-3">Quick Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Teachers</span>
              <span className="text-white text-xs font-medium">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Subjects</span>
              <span className="text-white text-xs font-medium">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Classes</span>
              <span className="text-white text-xs font-medium">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Rooms</span>
              <span className="text-white text-xs font-medium">15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;