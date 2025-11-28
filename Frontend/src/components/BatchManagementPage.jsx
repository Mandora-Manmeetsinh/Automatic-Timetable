import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, BookOpen, MapPin, Clock, AlertCircle, CheckCircle, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

const BatchManagementPage = ({ onBack, onNext }) => {
  const [batches, setBatches] = useState({});
  const [rooms, setRooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batchAssignments, setBatchAssignments] = useState({});
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Sample data based on your requirements
  useEffect(() => {
    setTimeout(() => {
      const sampleRooms = [
        { room_no: '101', capacity: 60, room_type: 'Classroom', equipment: 'Projector,Whiteboard' },
        { room_no: '102', capacity: 50, room_type: 'Classroom', equipment: 'Projector' },
        { room_no: '103', capacity: 55, room_type: 'Classroom', equipment: 'Projector,Whiteboard,AC' },
        { room_no: '104', capacity: 45, room_type: 'Classroom', equipment: 'Whiteboard' },
        { room_no: 'LAB-1', capacity: 30, room_type: 'Lab', equipment: 'Computers,Projector' },
        { room_no: 'LAB-2', capacity: 35, room_type: 'Lab', equipment: 'Computers' },
        { room_no: 'LAB-3', capacity: 28, room_type: 'Lab', equipment: 'Computers,Projector,AC' }
      ];

      const sampleSubjects = [
        { code: 'CS101', name: 'Operating Systems', type: 'Theory', needs_lab: true },
        { code: 'CS102', name: 'Database Systems', type: 'Theory', needs_lab: true },
        { code: 'CS103', name: 'Computer Networks', type: 'Theory', needs_lab: false },
        { code: 'CS104', name: 'Software Engineering', type: 'Theory', needs_lab: true },
        { code: 'CS105', name: 'Web Development', type: 'Theory', needs_lab: true },
        { code: 'CS106', name: 'Machine Learning', type: 'Theory', needs_lab: true }
      ];

      const sampleBatches = {
        'CSE-A-3': {
          name: 'CSE-A Semester 3',
          strength: 60,
          division: 'A',
          semester: 3,
          subBatches: [
            { id: 'A1', name: 'Batch A1', students: 30, subjects: ['CS101', 'CS102'] },
            { id: 'A2', name: 'Batch A2', students: 30, subjects: ['CS101', 'CS102'] }
          ]
        },
        'CSE-B-3': {
          name: 'CSE-B Semester 3',
          strength: 55,
          division: 'B',
          semester: 3,
          subBatches: [
            { id: 'B1', name: 'Batch B1', students: 28, subjects: ['CS103', 'CS104'] },
            { id: 'B2', name: 'Batch B2', students: 27, subjects: ['CS103', 'CS104'] }
          ]
        }
      };

      setRooms(sampleRooms);
      setSubjects(sampleSubjects);
      setBatches(sampleBatches);

      // Initialize batch assignments
      const initialAssignments = {};
      Object.keys(sampleBatches).forEach(batchKey => {
        initialAssignments[batchKey] = {};
        sampleSubjects.forEach(subject => {
          initialAssignments[batchKey][subject.code] = {
            teacher: null,
            room: null,
            batches: subject.needs_lab ? 'separate' : 'combined' // For lab subjects, use separate batches
          };
        });
      });
      setBatchAssignments(initialAssignments);

      setLoading(false);
    }, 1500);
  }, []);


  const assignRoomToBatch = (batchKey, subjectCode, roomNo) => {
    const room = rooms.find(r => r.room_no === roomNo);
    const subject = subjects.find(s => s.code === subjectCode);
    const batch = batches[batchKey];

    // Validate room capacity
    if (room && batch) {
      const assignment = batchAssignments[batchKey]?.[subjectCode];
      if (!assignment) return;

      const requiredCapacity = assignment.batches === 'combined'
        ? batch.strength
        : Math.max(...batch.subBatches.map(b => b.students));

      if (room.capacity < requiredCapacity) {
        alert(`Room ${roomNo} capacity (${room.capacity}) is insufficient for this batch (${requiredCapacity} students)`);
        return;
      }

      // Check room type compatibility
      if (subject.needs_lab && room.room_type !== 'Lab') {
        setConflicts(prev => [...prev.filter(c => !(c.batch === batchKey && c.subject === subjectCode)), {
          type: 'room_type_mismatch',
          batch: batchKey,
          subject: subjectCode,
          room: roomNo,
          message: `${subject.name} requires a lab room but ${roomNo} is a ${room.room_type}`
        }]);
      } else if (!subject.needs_lab && room.room_type === 'Lab') {
        setConflicts(prev => [...prev.filter(c => !(c.batch === batchKey && c.subject === subjectCode)), {
          type: 'room_type_mismatch',
          batch: batchKey,
          subject: subjectCode,
          room: roomNo,
          message: `${subject.name} is a theory subject but ${roomNo} is a lab room`
        }]);
      } else {
        // Remove any existing conflicts for this assignment
        setConflicts(prev => prev.filter(c => !(c.batch === batchKey && c.subject === subjectCode)));
      }
    }

    setBatchAssignments(prev => ({
      ...prev,
      [batchKey]: {
        ...prev[batchKey],
        [subjectCode]: {
          ...prev[batchKey][subjectCode],
          room: roomNo
        }
      }
    }));
  };

  const setBatchMode = (batchKey, subjectCode, mode) => {
    setBatchAssignments(prev => ({
      ...prev,
      [batchKey]: {
        ...prev[batchKey],
        [subjectCode]: {
          ...prev[batchKey][subjectCode],
          batches: mode
        }
      }
    }));
  };

  const addNewBatch = () => {
    const newBatchKey = `CSE-C-3`;
    const newBatch = {
      name: 'CSE-C Semester 3',
      strength: 50,
      division: 'C',
      semester: 3,
      subBatches: [
        { id: 'C1', name: 'Batch C1', students: 25, subjects: ['CS105', 'CS106'] },
        { id: 'C2', name: 'Batch C2', students: 25, subjects: ['CS105', 'CS106'] }
      ]
    };

    setBatches(prev => ({ ...prev, [newBatchKey]: newBatch }));

    // Initialize assignments for new batch
    setBatchAssignments(prev => ({
      ...prev,
      [newBatchKey]: Object.fromEntries(
        subjects.map(subject => [
          subject.code,
          {
            teacher: null,
            room: null,
            batches: subject.needs_lab ? 'separate' : 'combined'
          }
        ])
      )
    }));
  };

  const autoAssignRooms = () => {
    setLoading(true);

    setTimeout(() => {
      const newAssignments = JSON.parse(JSON.stringify(batchAssignments));

      // Auto-assign rooms based on requirements
      Object.keys(batches).forEach(batchKey => {
        const batch = batches[batchKey];

        subjects.forEach(subject => {
          // Ensure assignment object exists
          if (!newAssignments[batchKey]) newAssignments[batchKey] = {};
          if (!newAssignments[batchKey][subject.code]) {
            newAssignments[batchKey][subject.code] = {
              teacher: null,
              room: null,
              batches: subject.needs_lab ? 'separate' : 'combined'
            };
          }

          const assignment = newAssignments[batchKey][subject.code];
          if (!assignment.room) {
            // Find suitable room
            const requiredCapacity = assignment.batches === 'combined'
              ? batch.strength
              : Math.max(...batch.subBatches.map(b => b.students));

            const suitableRooms = rooms.filter(room => {
              const isCapacitySufficient = room.capacity >= requiredCapacity;
              const isTypeMatch = subject.needs_lab ? room.room_type === 'Lab' : room.room_type === 'Classroom';

              // Check if room is already assigned to another subject at the same time
              const isAvailable = true; // Simplified - in real implementation, check time conflicts

              return isCapacitySufficient && isTypeMatch && isAvailable;
            });

            if (suitableRooms.length > 0) {
              // Assign the best matching room (largest capacity for efficiency)
              const bestRoom = suitableRooms.sort((a, b) => a.capacity - b.capacity)[0];
              assignment.room = bestRoom.room_no;
            }
          }
        });
      });

      setBatchAssignments(newAssignments);
      setConflicts([]);
      setLoading(false);
    }, 1000);
  };

  const resetAssignments = () => {
    const initialAssignments = {};
    Object.keys(batches).forEach(batchKey => {
      initialAssignments[batchKey] = {};
      subjects.forEach(subject => {
        initialAssignments[batchKey][subject.code] = {
          teacher: null,
          room: null,
          batches: subject.needs_lab ? 'separate' : 'combined'
        };
      });
    });
    setBatchAssignments(initialAssignments);
    setConflicts([]);
  };

  const saveAssignments = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      if (onNext) {
        onNext(batchAssignments);
      }
    }, 1000);
  };

  const getAssignmentProgress = () => {
    let total = 0;
    let completed = 0;

    Object.keys(batches).forEach(batchKey => {
      subjects.forEach(subject => {
        total++;
        const assignment = batchAssignments[batchKey]?.[subject.code];
        if (assignment?.room) {
          completed++;
        }
      });
    });

    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center font-['Space_Grotesk']">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#f48c25] mx-auto mb-4"></div>
          <p className="text-[#9c7349] text-lg">Loading batch management...</p>
        </div>
      </div>
    );
  }

  const progress = getAssignmentProgress();

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
              <h1 className="text-4xl font-bold text-[#1c140d] mb-2">Batch & Room Management</h1>
              <p className="text-[#9c7349]">Manage batch divisions and assign rooms for optimal utilization</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={resetAssignments}
              className="px-4 py-2 text-[#9c7349] hover:text-[#1c140d] transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={autoAssignRooms}
              className="px-6 py-2 bg-white text-[#1c140d] border border-[#e8dbce] rounded-lg hover:bg-[#fff8f1] transition-colors font-bold"
              disabled={loading}
            >
              Auto Assign Rooms
            </button>
            <button
              onClick={addNewBatch}
              className="px-6 py-2 bg-[#1c140d] text-white rounded-lg hover:bg-[#333] transition-colors flex items-center space-x-2 font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Add Batch</span>
            </button>
            <button
              onClick={saveAssignments}
              className="px-6 py-2 bg-[#f48c25] text-white rounded-lg hover:bg-[#d6761b] transition-colors flex items-center space-x-2 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
              disabled={saving}
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save & Continue'}</span>
            </button>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-black text-blue-600 mb-2">{Object.keys(batches).length}</div>
            <div className="text-sm font-bold text-blue-800 uppercase tracking-wide">Total Batches</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-black text-green-600 mb-2">{progress.completed}</div>
            <div className="text-sm font-bold text-green-800 uppercase tracking-wide">Assignments Complete</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-black text-orange-600 mb-2">{conflicts.length}</div>
            <div className="text-sm font-bold text-orange-800 uppercase tracking-wide">Conflicts</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-black text-purple-600 mb-2">{progress.percentage}%</div>
            <div className="text-sm font-bold text-purple-800 uppercase tracking-wide">Progress</div>
          </div>
        </div>

        {/* Conflicts Alert */}
        {conflicts.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-red-800">Room Assignment Conflicts</h3>
            </div>
            <div className="space-y-1">
              {conflicts.map((conflict, index) => (
                <p key={index} className="text-red-700 text-sm">{conflict.message}</p>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batch Management */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#1c140d] mb-6">Batch Assignments</h2>

            <div className="space-y-6">
              {Object.keys(batches).map(batchKey => {
                const batch = batches[batchKey];
                return (
                  <div key={batchKey} className="bg-white border border-[#e8dbce] rounded-xl overflow-hidden shadow-sm">
                    {/* Batch Header */}
                    <div className="bg-[#fff8f1] px-6 py-4 border-b border-[#e8dbce]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-[#1c140d]">{batch.name}</h3>
                          <p className="text-sm text-[#9c7349]">Total Students: {batch.strength}</p>
                        </div>
                        <div className="flex space-x-4">
                          {batch.subBatches.map(subBatch => (
                            <div key={subBatch.id} className="text-center">
                              <div className="bg-[#f8f7f5] text-[#1c140d] border border-[#e8dbce] px-3 py-1 rounded-full text-sm font-bold">
                                {subBatch.name}
                              </div>
                              <div className="text-xs text-[#9c7349] mt-1 font-medium">{subBatch.students} students</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Subject Assignments */}
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-[#f8f7f5]">
                              <th className="px-4 py-3 text-left text-sm font-bold text-[#1c140d]">Subject</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-[#1c140d]">Type</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-[#1c140d]">Batch Mode</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-[#1c140d]">Assigned Room</th>
                              <th className="px-4 py-3 text-left text-sm font-bold text-[#1c140d]">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#e8dbce]">
                            {subjects.map(subject => {
                              const assignment = batchAssignments[batchKey]?.[subject.code];
                              const assignedRoom = assignment?.room ? rooms.find(r => r.room_no === assignment.room) : null;
                              const hasConflict = conflicts.some(c => c.batch === batchKey && c.subject === subject.code);

                              return (
                                <tr key={subject.code} className="hover:bg-[#f8f7f5] transition-colors">
                                  <td className="px-4 py-3">
                                    <div>
                                      <div className="font-bold text-[#1c140d]">{subject.name}</div>
                                      <div className="text-sm text-[#9c7349]">{subject.code}</div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${subject.needs_lab
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-blue-100 text-blue-800'
                                      }`}>
                                      {subject.needs_lab ? 'Lab' : 'Theory'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <select
                                      value={assignment?.batches || 'combined'}
                                      onChange={(e) => setBatchMode(batchKey, subject.code, e.target.value)}
                                      className="w-full px-3 py-2 border border-[#e8dbce] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f48c25] text-sm bg-white text-[#1c140d]"
                                    >
                                      <option value="combined">Combined</option>
                                      <option value="separate">Separate Batches</option>
                                    </select>
                                  </td>
                                  <td className="px-4 py-3">
                                    <select
                                      value={assignment?.room || ''}
                                      onChange={(e) => assignRoomToBatch(batchKey, subject.code, e.target.value)}
                                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f48c25] text-sm bg-white text-[#1c140d] ${hasConflict ? 'border-red-300 bg-red-50' : 'border-[#e8dbce]'
                                        }`}
                                    >
                                      <option value="">Select Room</option>
                                      {rooms
                                        .filter(room => subject.needs_lab ? room.room_type === 'Lab' : room.room_type === 'Classroom')
                                        .map(room => (
                                          <option key={room.room_no} value={room.room_no}>
                                            {room.room_no} ({room.capacity} capacity)
                                          </option>
                                        ))}
                                    </select>
                                    {assignedRoom && (
                                      <div className="text-xs text-[#9c7349] mt-1 font-medium">
                                        {assignedRoom.room_type} • {assignedRoom.equipment}
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-3">
                                    {hasConflict ? (
                                      <div className="flex items-center space-x-1 text-red-600 font-medium">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm">Conflict</span>
                                      </div>
                                    ) : assignment?.room ? (
                                      <div className="flex items-center space-x-1 text-green-600 font-medium">
                                        <CheckCircle className="w-4 h-4" />
                                        <span className="text-sm">Assigned</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center space-x-1 text-[#9c7349] opacity-75">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">Pending</span>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Room Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-[#1c140d] mb-6">Available Rooms</h2>

            <div className="space-y-4">
              {rooms.map(room => {
                // Count how many assignments use this room
                const assignmentCount = Object.keys(batches).reduce((count, batchKey) => {
                  return count + subjects.filter(subject =>
                    batchAssignments[batchKey]?.[subject.code]?.room === room.room_no
                  ).length;
                }, 0);

                return (
                  <div key={room.room_no} className="bg-white rounded-xl p-4 border border-[#e8dbce] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-[#1c140d] text-lg">{room.room_no}</h3>
                        <p className="text-sm text-[#9c7349]">{room.room_type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#1c140d]">
                          Capacity: {room.capacity}
                        </div>
                        <div className="text-xs text-[#9c7349]">
                          {assignmentCount} assignments
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm font-bold text-[#1c140d] mb-1">Equipment:</div>
                      <div className="flex flex-wrap gap-1">
                        {room.equipment.split(',').map(eq => (
                          <span key={eq} className="bg-[#f8f7f5] text-[#9c7349] border border-[#e8dbce] px-2 py-1 rounded text-xs font-medium">
                            {eq.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Utilization indicator */}
                    <div className="w-full bg-[#f8f7f5] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${assignmentCount === 0 ? 'bg-gray-400' :
                          assignmentCount <= 2 ? 'bg-green-500' :
                            assignmentCount <= 4 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${Math.min((assignmentCount / 6) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-[#9c7349] mt-1 font-medium">
                      {assignmentCount === 0 ? 'Available' :
                        assignmentCount <= 2 ? 'Low usage' :
                          assignmentCount <= 4 ? 'Moderate usage' : 'High usage'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Room Utilization Summary */}
            <div className="mt-8 p-6 bg-[#fff8f1] border border-[#e8dbce] rounded-xl">
              <h3 className="font-bold text-[#1c140d] mb-3 text-lg">Room Utilization</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9c7349]">Classrooms:</span>
                  <span className="font-bold text-[#1c140d]">
                    {rooms.filter(r => r.room_type === 'Classroom').length} available
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9c7349]">Labs:</span>
                  <span className="font-bold text-[#1c140d]">
                    {rooms.filter(r => r.room_type === 'Lab').length} available
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#e8dbce]">
                  <span className="text-[#9c7349] font-bold">Total Capacity:</span>
                  <span className="font-black text-[#1c140d]">
                    {rooms.reduce((sum, r) => sum + r.capacity, 0)} students
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {progress.percentage === 100 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => onNext && onNext()}
              className="px-8 py-3 bg-[#f48c25] text-white rounded-lg hover:bg-[#d6761b] transition-colors text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
            >
              Generate Final Timetable
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchManagementPage;