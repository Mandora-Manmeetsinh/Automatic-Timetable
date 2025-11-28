import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Printer, Calendar, User, BookOpen, MapPin, Search, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const TimetableOutputPage = ({ onBack, generatedTimetable }) => {
  const [activeView, setActiveView] = useState('class');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Extract data from backend response
  const timetableData = generatedTimetable?.timetable || {};
  const summary = generatedTimetable?.summary || {};
  const batches = Object.keys(timetableData);

  // Set initial selected batch
  useEffect(() => {
    if (batches.length > 0 && !selectedBatch) {
      setSelectedBatch(batches[0]);
    }
  }, [batches, selectedBatch]);

  // Extract unique teachers and rooms from timetable data
  const getTeachers = () => {
    const teachers = new Set();
    Object.values(timetableData).forEach(batch => {
      Object.values(batch).forEach(daySchedule => {
        daySchedule.forEach(slot => {
          if (slot.teacher && slot.teacher !== '-') {
            teachers.add(slot.teacher);
          }
        });
      });
    });
    return Array.from(teachers);
  };

  const getRooms = () => {
    const rooms = new Set();
    Object.values(timetableData).forEach(batch => {
      Object.values(batch).forEach(daySchedule => {
        daySchedule.forEach(slot => {
          if (slot.room && slot.room !== '-') {
            rooms.add(slot.room);
          }
        });
      });
    });
    return Array.from(rooms).sort();
  };

  const teachers = getTeachers();
  const rooms = getRooms();

  // Set initial teacher and room
  useEffect(() => {
    if (teachers.length > 0 && !selectedTeacher) {
      setSelectedTeacher(teachers[0]);
    }
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0]);
    }
  }, [teachers, rooms, selectedTeacher, selectedRoom]);

  const getSubjectColor = (subject) => {
    const colors = {
      'Operating Systems': 'bg-blue-50 text-blue-800 border-blue-200',
      'Database Systems': 'bg-green-50 text-green-800 border-green-200',
      'Computer Networks': 'bg-purple-50 text-purple-800 border-purple-200',
      'Software Engineering': 'bg-orange-50 text-orange-800 border-orange-200',
      'Web Development': 'bg-pink-50 text-pink-800 border-pink-200',
      'Machine Learning': 'bg-indigo-50 text-indigo-800 border-indigo-200',
      'Break': 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return colors[subject] || 'bg-[#f8f7f5] text-[#1c140d] border-[#e8dbce]';
  };

  // Generate teacher timetable from class data
  const getTeacherTimetable = (teacherName) => {
    const teacherSchedule = {};
    days.forEach(day => {
      teacherSchedule[day] = [];
    });

    Object.entries(timetableData).forEach(([batchName, batchSchedule]) => {
      Object.entries(batchSchedule).forEach(([day, slots]) => {
        slots.forEach(slot => {
          if (slot.teacher === teacherName) {
            teacherSchedule[day].push({
              ...slot,
              batch: batchName
            });
          }
        });
      });
    });

    return teacherSchedule;
  };

  // Generate room timetable from class data
  const getRoomTimetable = (roomName) => {
    const roomSchedule = {};
    days.forEach(day => {
      roomSchedule[day] = [];
    });

    Object.entries(timetableData).forEach(([batchName, batchSchedule]) => {
      Object.entries(batchSchedule).forEach(([day, slots]) => {
        slots.forEach(slot => {
          if (slot.room === roomName) {
            roomSchedule[day].push({
              ...slot,
              batch: batchName
            });
          }
        });
      });
    });

    return roomSchedule;
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    if (activeView === 'class' && selectedBatch) {
      const batchData = timetableData[selectedBatch];

      doc.setFontSize(18);
      doc.text(`Timetable - ${selectedBatch}`, 14, 15);

      const tableData = [];
      const timeSlots = batchData[days[0]]?.map(slot => slot.time) || [];

      timeSlots.forEach(time => {
        const row = [time];
        days.forEach(day => {
          const slot = batchData[day]?.find(s => s.time === time);
          if (slot) {
            row.push(`${slot.subject}\n${slot.teacher}\n${slot.room}`);
          } else {
            row.push('-');
          }
        });
        tableData.push(row);
      });

      doc.autoTable({
        head: [['Time', ...days]],
        body: tableData,
        startY: 25,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [28, 20, 13], textColor: [255, 255, 255] }, // #1c140d
        alternateRowStyles: { fillColor: [248, 247, 245] } // #f8f7f5
      });
    } else if (activeView === 'teacher' && selectedTeacher) {
      const teacherSchedule = getTeacherTimetable(selectedTeacher);

      doc.setFontSize(18);
      doc.text(`Teacher Timetable - ${selectedTeacher}`, 14, 15);

      const tableData = [];
      const timeSlots = teacherSchedule[days[0]]?.map(slot => slot.time) || [];
      const allTimes = new Set();
      Object.values(teacherSchedule).forEach(daySlots => {
        daySlots.forEach(slot => allTimes.add(slot.time));
      });

      Array.from(allTimes).sort().forEach(time => {
        const row = [time];
        days.forEach(day => {
          const slot = teacherSchedule[day]?.find(s => s.time === time);
          if (slot) {
            row.push(`${slot.subject}\n${slot.batch}\n${slot.room}`);
          } else {
            row.push('-');
          }
        });
        tableData.push(row);
      });

      doc.autoTable({
        head: [['Time', ...days]],
        body: tableData,
        startY: 25,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [28, 20, 13], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [248, 247, 245] }
      });
    }

    doc.save(`timetable-${activeView}-${new Date().getTime()}.pdf`);
  };

  // Export to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    if (activeView === 'class') {
      // Export all batches
      Object.entries(timetableData).forEach(([batchName, batchData]) => {
        const wsData = [['Time', ...days]];

        const timeSlots = batchData[days[0]]?.map(slot => slot.time) || [];
        timeSlots.forEach(time => {
          const row = [time];
          days.forEach(day => {
            const slot = batchData[day]?.find(s => s.time === time);
            if (slot) {
              row.push(`${slot.subject} | ${slot.teacher} | ${slot.room}`);
            } else {
              row.push('-');
            }
          });
          wsData.push(row);
        });

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, batchName.substring(0, 31));
      });
    } else if (activeView === 'teacher') {
      // Export all teachers
      teachers.forEach(teacher => {
        const teacherSchedule = getTeacherTimetable(teacher);
        const wsData = [['Time', ...days]];

        const allTimes = new Set();
        Object.values(teacherSchedule).forEach(daySlots => {
          daySlots.forEach(slot => allTimes.add(slot.time));
        });

        Array.from(allTimes).sort().forEach(time => {
          const row = [time];
          days.forEach(day => {
            const slot = teacherSchedule[day]?.find(s => s.time === time);
            if (slot) {
              row.push(`${slot.subject} | ${slot.batch} | ${slot.room}`);
            } else {
              row.push('-');
            }
          });
          wsData.push(row);
        });

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, teacher.substring(0, 31));
      });
    } else if (activeView === 'room') {
      // Export all rooms
      rooms.forEach(room => {
        const roomSchedule = getRoomTimetable(room);
        const wsData = [['Time', ...days]];

        const allTimes = new Set();
        Object.values(roomSchedule).forEach(daySlots => {
          daySlots.forEach(slot => allTimes.add(slot.time));
        });

        Array.from(allTimes).sort().forEach(time => {
          const row = [time];
          days.forEach(day => {
            const slot = roomSchedule[day]?.find(s => s.time === time);
            if (slot) {
              row.push(`${slot.subject} | ${slot.batch} | ${slot.teacher}`);
            } else {
              row.push('-');
            }
          });
          wsData.push(row);
        });

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, room.substring(0, 31));
      });
    }

    XLSX.writeFile(wb, `timetable-${activeView}-${new Date().getTime()}.xlsx`);
  };

  const printTimetable = () => {
    window.print();
  };

  const renderClassTimetable = () => {
    if (!selectedBatch || !timetableData[selectedBatch]) return null;

    const batchData = timetableData[selectedBatch];

    return (
      <div className="bg-white border border-[#e8dbce] rounded-xl overflow-hidden shadow-sm">
        <div className="bg-[#fff8f1] px-6 py-4 border-b border-[#e8dbce]">
          <h3 className="text-xl font-bold text-[#1c140d]">{selectedBatch}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f7f5]">
                <th className="px-4 py-3 text-left text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] sticky left-0 bg-[#f8f7f5] z-10">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] min-w-40">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {batchData[days[0]]?.map((slot, index) => (
                <tr key={slot.time} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f8f7f5]'}>
                  <td className="px-4 py-3 text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] bg-[#f8f7f5] sticky left-0 z-10">
                    {slot.time}
                  </td>
                  {days.map(day => {
                    const daySlot = batchData[day]?.find(s => s.time === slot.time);

                    return (
                      <td key={day} className="px-2 py-2 border-r border-[#e8dbce]">
                        {daySlot ? (
                          <div className={`p-3 rounded-lg border text-xs ${getSubjectColor(daySlot.subject)}`}>
                            <div className="font-bold mb-1">{daySlot.subject}</div>
                            {daySlot.teacher && daySlot.teacher !== '-' && (
                              <div className="flex items-center mt-1 opacity-75">
                                <User className="w-3 h-3 mr-1" />
                                <span className="truncate font-medium">{daySlot.teacher}</span>
                              </div>
                            )}
                            {daySlot.room && daySlot.room !== '-' && (
                              <div className="flex items-center opacity-75">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="truncate font-medium">{daySlot.room}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-20 bg-[#f8f7f5] rounded border-2 border-dashed border-[#e8dbce]"></div>
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

  const renderTeacherTimetable = () => {
    if (!selectedTeacher) return null;

    const teacherSchedule = getTeacherTimetable(selectedTeacher);
    const allTimes = new Set();
    Object.values(teacherSchedule).forEach(daySlots => {
      daySlots.forEach(slot => allTimes.add(slot.time));
    });
    const sortedTimes = Array.from(allTimes).sort();

    return (
      <div className="bg-white border border-[#e8dbce] rounded-xl overflow-hidden shadow-sm">
        <div className="bg-[#fff8f1] px-6 py-4 border-b border-[#e8dbce]">
          <h3 className="text-xl font-bold text-[#1c140d]">{selectedTeacher}</h3>
          <p className="text-sm text-[#9c7349]">Teacher Schedule</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f7f5]">
                <th className="px-4 py-3 text-left text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] sticky left-0 bg-[#f8f7f5] z-10">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] min-w-40">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTimes.map((time, index) => (
                <tr key={time} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f8f7f5]'}>
                  <td className="px-4 py-3 text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] bg-[#f8f7f5] sticky left-0 z-10">
                    {time}
                  </td>
                  {days.map(day => {
                    const slot = teacherSchedule[day]?.find(s => s.time === time);

                    return (
                      <td key={day} className="px-2 py-2 border-r border-[#e8dbce]">
                        {slot ? (
                          <div className={`p-3 rounded-lg border text-xs ${getSubjectColor(slot.subject)}`}>
                            <div className="font-bold mb-1">{slot.subject}</div>
                            <div className="flex items-center mt-1 opacity-75">
                              <BookOpen className="w-3 h-3 mr-1" />
                              <span className="truncate font-medium">{slot.batch}</span>
                            </div>
                            <div className="flex items-center opacity-75">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span className="truncate font-medium">{slot.room}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-20 bg-[#f8f7f5] rounded border-2 border-dashed border-[#e8dbce]"></div>
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

  const renderRoomTimetable = () => {
    if (!selectedRoom) return null;

    const roomSchedule = getRoomTimetable(selectedRoom);
    const allTimes = new Set();
    Object.values(roomSchedule).forEach(daySlots => {
      daySlots.forEach(slot => allTimes.add(slot.time));
    });
    const sortedTimes = Array.from(allTimes).sort();

    return (
      <div className="bg-white border border-[#e8dbce] rounded-xl overflow-hidden shadow-sm">
        <div className="bg-[#fff8f1] px-6 py-4 border-b border-[#e8dbce]">
          <h3 className="text-xl font-bold text-[#1c140d]">Room {selectedRoom}</h3>
          <p className="text-sm text-[#9c7349]">Room Utilization Schedule</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f7f5]">
                <th className="px-4 py-3 text-left text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] sticky left-0 bg-[#f8f7f5] z-10">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] min-w-40">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTimes.map((time, index) => (
                <tr key={time} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f8f7f5]'}>
                  <td className="px-4 py-3 text-sm font-bold text-[#1c140d] border-r border-[#e8dbce] bg-[#f8f7f5] sticky left-0 z-10">
                    {time}
                  </td>
                  {days.map(day => {
                    const slot = roomSchedule[day]?.find(s => s.time === time);

                    return (
                      <td key={day} className="px-2 py-2 border-r border-[#e8dbce]">
                        {slot ? (
                          <div className={`p-3 rounded-lg border text-xs ${getSubjectColor(slot.subject)}`}>
                            <div className="font-bold mb-1">{slot.subject}</div>
                            <div className="flex items-center mt-1 opacity-75">
                              <BookOpen className="w-3 h-3 mr-1" />
                              <span className="truncate font-medium">{slot.batch}</span>
                            </div>
                            <div className="flex items-center opacity-75">
                              <User className="w-3 h-3 mr-1" />
                              <span className="truncate font-medium">{slot.teacher}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-20 bg-[#f8f7f5] rounded border-2 border-dashed border-[#e8dbce]"></div>
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

  return (
    <div className="min-h-screen bg-[#f8f7f5] font-['Space_Grotesk'] text-[#1c140d]">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-[#9c7349] hover:text-[#1c140d] transition-colors mr-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <div>
              <h1 className="text-4xl font-bold text-[#1c140d] mb-2">Generated Timetables</h1>
              <p className="text-[#9c7349]">View and export your generated timetables</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={printTimetable}
              className="px-4 py-2 text-[#9c7349] hover:text-[#1c140d] transition-colors flex items-center space-x-2 border border-[#e8dbce] rounded-lg hover:bg-[#fff8f1] font-bold"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-6 py-2 bg-[#1c140d] text-white rounded-lg hover:bg-[#333] transition-colors flex items-center space-x-2 font-bold shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e8dbce] rounded-lg shadow-lg z-20">
                  <button
                    onClick={() => { exportToPDF(); setShowExportMenu(false); }}
                    className="block w-full px-4 py-3 text-left text-sm text-[#1c140d] hover:bg-[#f8f7f5] flex items-center space-x-2 font-medium"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Export as PDF</span>
                  </button>
                  <button
                    onClick={() => { exportToExcel(); setShowExportMenu(false); }}
                    className="block w-full px-4 py-3 text-left text-sm text-[#1c140d] hover:bg-[#f8f7f5] flex items-center space-x-2 border-t border-[#e8dbce] font-medium"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Export as Excel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-blue-600 mb-1">{summary.totalSubjects || 4}</div>
            <div className="text-sm font-bold text-blue-800 uppercase tracking-wide">Total Subjects</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-green-600 mb-1">{summary.totalTeachers || 4}</div>
            <div className="text-sm font-bold text-green-800 uppercase tracking-wide">Total Teachers</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-purple-600 mb-1">{batches.length}</div>
            <div className="text-sm font-bold text-purple-800 uppercase tracking-wide">Total Classes</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-orange-600 mb-1">{summary.totalRooms || 7}</div>
            <div className="text-sm font-bold text-orange-800 uppercase tracking-wide">Total Rooms</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-indigo-600 mb-1">{summary.utilizationRate || 85}%</div>
            <div className="text-sm font-bold text-indigo-800 uppercase tracking-wide">Utilization</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-[#e8dbce] rounded-lg p-1">
            <button
              onClick={() => setActiveView('class')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeView === 'class'
                ? 'bg-white text-[#1c140d] shadow-sm'
                : 'text-[#9c7349] hover:text-[#1c140d]'
                }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Class View
            </button>
            <button
              onClick={() => setActiveView('teacher')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeView === 'teacher'
                ? 'bg-white text-[#1c140d] shadow-sm'
                : 'text-[#9c7349] hover:text-[#1c140d]'
                }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Teacher View
            </button>
            <button
              onClick={() => setActiveView('room')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeView === 'room'
                ? 'bg-white text-[#1c140d] shadow-sm'
                : 'text-[#9c7349] hover:text-[#1c140d]'
                }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              Room View
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9c7349] w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#e8dbce] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f48c25] text-sm bg-white text-[#1c140d] placeholder-[#9c7349]"
            />
          </div>
        </div>

        {/* Content */}
        {activeView === 'class' && (
          <div>
            {/* Batch Selector */}
            <div className="mb-6">
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#e8dbce]">
                {batches.map(batch => (
                  <button
                    key={batch}
                    onClick={() => setSelectedBatch(batch)}
                    className={`px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedBatch === batch
                      ? 'bg-[#1c140d] text-white shadow-lg'
                      : 'bg-white text-[#1c140d] hover:bg-[#f8f7f5] border border-[#e8dbce]'
                      }`}
                  >
                    {batch}
                  </button>
                ))}
              </div>
            </div>

            {/* Class Timetable */}
            {renderClassTimetable()}
          </div>
        )}

        {activeView === 'teacher' && (
          <div>
            {/* Teacher Selector */}
            <div className="mb-6">
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#e8dbce]">
                {teachers.map(teacher => (
                  <button
                    key={teacher}
                    onClick={() => setSelectedTeacher(teacher)}
                    className={`px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedTeacher === teacher
                      ? 'bg-[#1c140d] text-white shadow-lg'
                      : 'bg-white text-[#1c140d] hover:bg-[#f8f7f5] border border-[#e8dbce]'
                      }`}
                  >
                    {teacher}
                  </button>
                ))}
              </div>
            </div>

            {/* Teacher Timetable */}
            {renderTeacherTimetable()}
          </div>
        )}

        {activeView === 'room' && (
          <div>
            {/* Room Selector */}
            <div className="mb-6">
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#e8dbce]">
                {rooms.map(room => (
                  <button
                    key={room}
                    onClick={() => setSelectedRoom(room)}
                    className={`px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedRoom === room
                      ? 'bg-[#1c140d] text-white shadow-lg'
                      : 'bg-white text-[#1c140d] hover:bg-[#f8f7f5] border border-[#e8dbce]'
                      }`}
                  >
                    Room {room}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Timetable */}
            {renderRoomTimetable()}
          </div>
        )}

        {/* Subject Legend */}
        <div className="mt-12 bg-white border border-[#e8dbce] rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#1c140d] mb-4">Subject Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Operating Systems',
              'Database Systems',
              'Computer Networks',
              'Software Engineering',
              'Web Development',
              'Machine Learning'
            ].map(subject => (
              <div key={subject} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded border ${getSubjectColor(subject).split(' ').filter(c => c.startsWith('bg-')).join(' ')} border-opacity-20`}></div>
                <span className="text-sm text-[#1c140d] font-medium">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableOutputPage;