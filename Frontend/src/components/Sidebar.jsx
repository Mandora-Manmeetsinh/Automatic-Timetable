import React, { useState } from 'react';
import { X, Home, Upload, Users, Calendar, FileText, Clock, Database, User, LogOut, ChevronDown, ChevronRight, Settings, HelpCircle } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentPage, onPageChange }) => {
    const [expandedSections, setExpandedSections] = useState({
        history: false,
        timetables: false,
        data: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'upload', label: 'Upload Data', icon: Upload },
        { id: 'teacher-assignment', label: 'Assignments', icon: Users },
        { id: 'batch-management', label: 'Batches', icon: Calendar },
        { id: 'timetable-output', label: 'Timetables', icon: FileText },
    ];

    // Demo data for expandable sections
    const historyItems = [
        { id: 'h1', label: 'Nov 2024 Schedule', date: '2 days ago' },
        { id: 'h2', label: 'Oct 2024 Final', date: '1 month ago' },
    ];

    const timetableItems = [
        { id: 't1', label: 'CSE Sem 3', status: 'active' },
        { id: 't2', label: 'CSE Sem 5', status: 'draft' },
    ];

    const dataItems = [
        { id: 'd1', label: 'Teachers', count: 45 },
        { id: 'd2', label: 'Subjects', count: 28 },
        { id: 'd3', label: 'Rooms', count: 15 },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-72 bg-white z-50
          transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col border-r border-gray-200 shadow-xl
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 mb-2">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Automatic Timetable</h2>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Generator</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all lg:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">

                    {/* Main Menu */}
                    <div className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onPageChange(item.id);
                                        onClose();
                                    }}
                                    className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-200 group relative overflow-hidden
                    ${isActive
                                            ? 'text-indigo-700 bg-indigo-50 border border-indigo-100'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }
                  `}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l-xl" />
                                    )}
                                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Workspace Section */}
                    <div className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Workspace</p>

                        {/* History */}
                        <div className="overflow-hidden">
                            <button
                                onClick={() => toggleSection('history')}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all group"
                            >
                                <div className="flex items-center space-x-3">
                                    <Clock className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                    <span>History</span>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform duration-300 text-gray-400 ${expandedSections.history ? 'rotate-90' : ''}`} />
                            </button>
                            <div className={`space-y-1 pl-11 pr-2 overflow-hidden transition-all duration-300 ${expandedSections.history ? 'max-h-40 mt-1' : 'max-h-0'}`}>
                                {historyItems.map(item => (
                                    <button key={item.id} className="w-full flex items-center justify-between py-2 text-xs text-gray-500 hover:text-gray-900 transition-colors group">
                                        <span>{item.label}</span>
                                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 group-hover:text-gray-700">{item.date}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* My Timetables */}
                        <div className="overflow-hidden">
                            <button
                                onClick={() => toggleSection('timetables')}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all group"
                            >
                                <div className="flex items-center space-x-3">
                                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                    <span>My Timetables</span>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform duration-300 text-gray-400 ${expandedSections.timetables ? 'rotate-90' : ''}`} />
                            </button>
                            <div className={`space-y-1 pl-11 pr-2 overflow-hidden transition-all duration-300 ${expandedSections.timetables ? 'max-h-40 mt-1' : 'max-h-0'}`}>
                                {timetableItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            onPageChange('timetable-output');
                                            onClose();
                                        }}
                                        className="w-full flex items-center justify-between py-2 text-xs text-gray-500 hover:text-gray-900 transition-colors group hover:bg-gray-50 rounded-lg px-2"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-emerald-500 shadow-sm' : 'bg-amber-500'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Uploaded Data */}
                        <div className="overflow-hidden">
                            <button
                                onClick={() => toggleSection('data')}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all group"
                            >
                                <div className="flex items-center space-x-3">
                                    <Database className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                    <span>Uploaded Data</span>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform duration-300 text-gray-400 ${expandedSections.data ? 'rotate-90' : ''}`} />
                            </button>
                            <div className={`space-y-1 pl-11 pr-2 overflow-hidden transition-all duration-300 ${expandedSections.data ? 'max-h-40 mt-1' : 'max-h-0'}`}>
                                {dataItems.map(item => (
                                    <button key={item.id} className="w-full flex items-center justify-between py-2 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                                        <span>{item.label}</span>
                                        <span className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{item.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50/50">
                    <button
                        onClick={() => {
                            onPageChange('profile');
                            onClose();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm transition-all group mb-2 border border-transparent hover:border-gray-200"
                    >
                        <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                MM
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 text-left overflow-hidden">
                            <div className="text-sm font-medium text-gray-900 truncate">Mandora Manmeet</div>
                            <div className="text-xs text-gray-500 truncate">Admin Workspace</div>
                        </div>
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </button>

                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-100 transition-all duration-300 group shadow-sm hover:shadow">
                        <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
