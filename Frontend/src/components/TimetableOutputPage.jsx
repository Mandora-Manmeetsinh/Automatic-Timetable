import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Printer, Eye, Calendar, User, BookOpen, MapPin, Clock, Filter, Search } from 'lucide-react';

const TimetableOutputPage = ({ onBack }) => {
  const [activeView, setActiveView] = useState('class'); // class, teacher, room
  const [selectedClass, setSelectedClass] = useState('CSE-A-3');
  const [selectedTeacher, setSelectedTeacher] = useState('T1');
  const [timetableData, setTimetableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Time slots
  const timeSlots = [
    '9:00-10:00',
    '10:00-11:00', 
    '11:00-12:00',
    '12:00-1:00',
    '1:00-2:00',
    '2:00-3:00',
    '3:00-4:00',
    '4:00-5:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Sample generated timetable data
  useEffect(() => {
    setTimeout(() => {
      const sampleTimetable = {
        classes: {
          'CSE-A-3': {
            name: 'CSE-A Semester 3',
            schedule: {
              'Monday': [
                { time: '9:00-10:00', subject: 'Operating Systems', teacher: 'Rumi Jha', room: '101', type: 'Theory' },
                { time: '10:00-11:00', subject: 'Database Systems', teacher: 'Amit Singh', room: '102', type: 'Theory' },
                { time: '11:00-12:00', subject: 'Break', teacher: '', room: '', type: 'Break' },
                { time: '12:00-1:00', subject: 'Computer Networks', teacher: 'Neha Patel', room: '101', type: 'Theory' },
                { time: '1:00-2:00', subject: 'Lunch Break', teacher: '', room: '', type: 'Break' },
                { time: '2:00-3:00', subject: 'OS Lab', teacher: 'Rumi Jha', room: 'LAB-1', type: 'Lab' },
                { time: '3:00-4:00', subject: 'OS Lab', teacher: 'Rumi Jha', room: 'LAB-1', type: 'Lab' },
                { time: '4:00-5:00', subject: 'Software Engineering', teacher: 'Rahul Verma', room: '103', type: 'Theory' }
              ],
              'Tuesday': [
                { time: '9:00-10:00', subject: 'Database Systems', teacher: 'Amit Singh', room: '102', type: 'Theory' },
                { time: '10:00-11:00', subject: 'Computer Networks', teacher: 'Neha Patel', room: '101', type: 'Theory' },
                { time: '11:00-12:00', subject: 'Break', teacher: '', room: '', type: 'Break' },
                { time: '12:00-1:00', subject: 'Operating Systems', teacher: 'Rumi Jha', room: '101', type: 'Theory' },
                { time: '1:00-2:00', subject: 'Lunch Break', teacher: '', room: '', type: 'Break' },
                { time: '2:00-3:00', subject: 'DB Lab', teacher: 'Amit Singh', room: 'LAB-2', type: 'Lab' },
                { time: '3:00-4:00', subject: 'DB Lab', teacher: 'Amit Singh', room: 'LAB-2', type: 'Lab' },
                { time: '4:00-5:00', subject: 'Software Engineering', teacher: 'Rahul Verma', room: '103', type: 'Theory' }
              ],
              // Add more days...
            }
          },
          'CSE-B-3': {
            name: 'CSE-B Semester 3',
            schedule: {
              'Monday': [
                { time: '9:00-10:00', subject: 'Computer Networks', teacher: 'Neha Patel', room: '104', type: 'Theory' },
                { time: '10:00-11:00', subject: 'Operating Systems', teacher: 'Rumi Jha', room: '105', type: 'Theory' },
                // Add more...
              ]
            }
          }
        },
        teachers: {
          'T1': {
            name: 'Rumi Jha',
            designation: 'HOD',
            schedule: {
              'Monday': [
                { time: '9:00-10:00', subject: 'Operating Systems', class: 'CSE-A-3', room: '101', type: 'Theory' },
                { time: '2:00-3:00', subject: 'OS Lab', class: 'CSE-A-3', room: 'LAB-1', type: 'Lab' },
                { time: '3:00-4:00', subject: 'OS Lab', class: 'CSE-A-3', room: 'LAB-1', type: 'Lab' }
              ],
              'Tuesday': [
                { time: '12:00-1:00', subject: 'Operating Systems', class: 'CSE-A-3', room: '101', type: 'Theory' }
              ]
            }
          },
          'T2': {
            name: 'Amit Singh',
            designation: 'Subject Head',
            schedule: {
              'Monday': [
                { time: '10:00-11:00', subject: 'Database Systems', class: 'CSE-A-3', room: '102', type: 'Theory' }
              ]
            }
          }
        },
        summary: {
          totalSubjects: 6,
          totalTeachers: 4,
          totalClasses: 3,
          totalHours: 42,
          utilizationRate: 85
        }
      };
      
      setTimetableData(sampleTimetable);
      setLoading(false);
    }, 2000);
  }, []);

  const getSubjectColor = (subject) => {
    const colors = {
      'Operating Systems': 'bg-blue-100 text-blue-800 border-blue-200',
      'Database Systems': 'bg-green-100 text-green-800 border-green-200',
      'Computer Networks': 'bg-purple-100 text-purple-800 border-purple-200',
      'Software Engineering': 'bg-orange-100 text-orange-800 border-orange-200',
      'OS Lab': 'bg-blue-50 text-blue-900 border-blue-300',
      'DB Lab': 'bg-green-50 text-green-900 border-green-300',
      'Break': 'bg-gray-100 text-gray-600 border-gray-200',
      'Lunch Break': 'bg-gray-50 text-gray-500 border-gray-300'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const exportTimetable = (format) => {
    if (format === 'pdf') {
      alert('Exporting timetable as PDF...');
    } else if (format === 'excel') {
      alert('Exporting timetable as Excel...');
    } else if (format === 'image') {
      alert('Exporting timetable as Image...');
    }
  };

  const printTimetable = () => {
    window.print();
  };

  const renderClassTimetable = (classData) => {
    if (!classData) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-black">{classData.name}</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-r border-gray-200">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-semibold text-black border-r border-gray-200 min-w-32">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot, index) => (
                <tr key={timeSlot} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50">
                    {timeSlot}
                  </td>
                  {days.map(day => {
                    const daySchedule = classData.schedule[day] || [];
                    const slot = daySchedule.find(s => s.time === timeSlot);
                    
                    return (
                      <td key={day} className="px-2 py-2 border-r border-gray-200">
                        {slot ? (
                          <div className={`p-2 rounded-lg border text-xs ${getSubjectColor(slot.subject)}`}>
                            <div className="font-semibold truncate">{slot.subject}</div>
                            {slot.teacher && (
                              <div className="flex items-center mt-1 opacity-75">
                                <User className="w-3 h-3 mr-1" />
                                <span className="truncate">{slot.teacher}</span>
                              </div>
                            )}
                            {slot.room && (
                              <div className="flex items-center opacity-75">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="truncate">{slot.room}</span>
                              </div>
                            )}
                            {slot.type && slot.type !== 'Break' && (
                              <div className="mt-1">
                                <span className={`text-xs px-1 py-0.5 rounded ${
                                  slot.type === 'Lab' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {slot.type}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-16 bg-gray-50 rounded border-2 border-dashed border-gray-200"></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTeacherTimetable = (teacherData) => {
    if (!teacherData) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-black">{teacherData.name}</h3>
          <p className="text-sm text-gray-600">{teacherData.designation}</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-r border-gray-200">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-semibold text-black border-r border-gray-200 min-w-32">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot, index) => (
                <tr key={timeSlot} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50">
                    {timeSlot}
                  </td>
                  {days.map(day => {
                    const daySchedule = teacherData.schedule[day] || [];
                    const slot = daySchedule.find(s => s.time === timeSlot);
                    
                    return (
                      <td key={day} className="px-2 py-2 border-r border-gray-200">
                        {slot ? (
                          <div className={`p-2 rounded-lg border text-xs ${getSubjectColor(slot.subject)}`}>
                            <div className="font-semibold truncate">{slot.subject}</div>
                            <div className="flex items-center mt-1 opacity-75">
                              <BookOpen className="w-3 h-3 mr-1" />
                              <span className="truncate">{slot.class}</span>
                            </div>
                            <div className="flex items-center opacity-75">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span className="truncate">{slot.room}</span>
                            </div>
                            {slot.type && (
                              <div className="mt-1">
                                <span className={`text-xs px-1 py-0.5 rounded ${
                                  slot.type === 'Lab' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {slot.type}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-16 bg-gray-50 rounded border-2 border-dashed border-gray-200"></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSummaryStats = () => {
    if (!timetableData.summary) return null;

    const stats = timetableData.summary;
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalSubjects}</div>
          <div className="text-sm text-blue-800">Total Subjects</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{stats.totalTeachers}</div>
          <div className="text-sm text-green-800">Total Teachers</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalClasses}</div>
          <div className="text-sm text-purple-800">Total Classes</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">{stats.totalHours}</div>
          <div className="text-sm text-orange-800">Total Hours</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-indigo-600 mb-1">{stats.utilizationRate}%</div>
          <div className="text-sm text-indigo-800">Utilization</div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Generating timetables...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Generated Timetables</h1>
              <p className="text-gray-600">View and export your generated timetables</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={printTimetable}
              className="px-4 py-2 text-gray-600 hover:text-black transition-colors flex items-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <div className="relative">
              <button className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block">
                <button 
                  onClick={() => exportTimetable('pdf')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Export as PDF
                </button>
                <button 
                  onClick={() => exportTimetable('excel')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Export as Excel
                </button>
                <button 
                  onClick={() => exportTimetable('image')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Export as Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        {renderSummaryStats()}

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('class')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'class' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Class View
            </button>
            <button
              onClick={() => setActiveView('teacher')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'teacher' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Teacher View
            </button>
            <button
              onClick={() => setActiveView('room')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'room' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Room View
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {activeView === 'class' && (
          <div>
            {/* Class Selector */}
            <div className="mb-6">
              <div className="flex space-x-4 overflow-x-auto">
                {Object.keys(timetableData.classes || {}).map(classKey => (
                  <button
                    key={classKey}
                    onClick={() => setSelectedClass(classKey)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                      selectedClass === classKey
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {timetableData.classes[classKey].name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Class Timetable */}
            {renderClassTimetable(timetableData.classes?.[selectedClass])}
          </div>
        )}

        {activeView === 'teacher' && (
          <div>
            {/* Teacher Selector */}
            <div className="mb-6">
              <div className="flex space-x-4 overflow-x-auto">
                {Object.keys(timetableData.teachers || {}).map(teacherKey => (
                  <button
                    key={teacherKey}
                    onClick={() => setSelectedTeacher(teacherKey)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                      selectedTeacher === teacherKey
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {timetableData.teachers[teacherKey].name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Teacher Timetable */}
            {renderTeacherTimetable(timetableData.teachers?.[selectedTeacher])}
          </div>
        )}

        {activeView === 'room' && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Room View</h3>
            <p className="text-gray-500">Room-wise timetable view coming soon...</p>
          </div>
        )}

        {/* Subject Legend */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-black mb-4">Subject Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Operating Systems',
              'Database Systems', 
              'Computer Networks',
              'Software Engineering',
              'OS Lab',
              'DB Lab'
            ].map(subject => (
              <div key={subject} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded border ${getSubjectColor(subject)}`}></div>
                <span className="text-sm text-gray-700">{subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Summary */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-black mb-4">Teacher Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-black">Teacher</th>
                  <th className="px-4 py-3 text-left font-semibold text-black">Designation</th>
                  <th className="px-4 py-3 text-left font-semibold text-black">Subjects</th>
                  <th className="px-4 py-3 text-left font-semibold text-black">Total Hours</th>
                  <th className="px-4 py-3 text-left font-semibold text-black">Workload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium text-black">Rumi Jha</td>
                  <td className="px-4 py-3 text-gray-600">HOD</td>
                  <td className="px-4 py-3 text-gray-600">Operating Systems, OS Lab</td>
                  <td className="px-4 py-3 text-gray-600">12h/week</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">75%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-black">Amit Singh</td>
                  <td className="px-4 py-3 text-gray-600">Subject Head</td>
                  <td className="px-4 py-3 text-gray-600">Database Systems, DB Lab</td>
                  <td className="px-4 py-3 text-gray-600">4h/week</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">100%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-black">Neha Patel</td>
                  <td className="px-4 py-3 text-gray-600">Professor</td>
                  <td className="px-4 py-3 text-gray-600">Computer Networks</td>
                  <td className="px-4 py-3 text-gray-600">8h/week</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '50%'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">50%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-black">Rahul Verma</td>
                  <td className="px-4 py-3 text-gray-600">Assistant Professor</td>
                  <td className="px-4 py-3 text-gray-600">Software Engineering</td>
                  <td className="px-4 py-3 text-gray-600">6h/week</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '37.5%'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">37.5%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableOutputPage;