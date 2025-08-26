import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Clock, BookOpen, AlertTriangle, CheckCircle, Save, RotateCcw } from 'lucide-react';

const TeacherAssignmentPage = ({ onBack, onNext }) => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [workloadSummary, setWorkloadSummary] = useState({});
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Sample data based on your schema
  useEffect(() => {
    // Simulate loading data from uploaded files
    setTimeout(() => {
      const sampleTeachers = [
        {
          mis_id: 'T1',
          name: 'Rumi Jha',
          email: 'rumi@abc.edu',
          designation: 'HOD',
          subject_preferences: ['CS101', 'CS102', 'CS103'],
          max_hours: 16, // Senior professor
          shift: 'Morning',
          preferred_shift: 'Morning'
        },
        {
          mis_id: 'T2',
          name: 'Amit Singh',
          email: 'amit@abc.edu',
          designation: 'Subject Head',
          subject_preferences: ['CS104', 'CS105'],
          max_hours: 4, // Higher post
          shift: 'Morning',
          preferred_shift: 'General'
        },
        {
          mis_id: 'T3',
          name: 'Neha Patel',
          email: 'neha@abc.edu',
          designation: 'Professor',
          subject_preferences: ['CS106', 'CS107'],
          max_hours: 16,
          shift: 'Morning',
          preferred_shift: 'Morning'
        },
        {
          mis_id: 'T4',
          name: 'Rahul Verma',
          email: 'rahul@abc.edu',
          designation: 'Assistant Professor',
          subject_preferences: ['CS108', 'CS109'],
          max_hours: 16,
          shift: 'Morning',
          preferred_shift: 'General'
        }
      ];

      const sampleSubjects = [
        {
          code: 'CS101',
          name: 'Operating Systems',
          department: 'CSE',
          semester: 3,
          weekly_load: '3,1', // Theory, Lab
          assigned_teacher: null,
          total_hours: 4
        },
        {
          code: 'CS102',
          name: 'Database Systems',
          department: 'CSE',
          semester: 3,
          weekly_load: '2,2',
          assigned_teacher: null,
          total_hours: 4
        },
        {
          code: 'CS103',
          name: 'Computer Networks',
          department: 'CSE',
          semester: 3,
          weekly_load: '3,0',
          assigned_teacher: null,
          total_hours: 3
        },
        {
          code: 'CS104',
          name: 'Software Engineering',
          department: 'CSE',
          semester: 3,
          weekly_load: '2,1',
          assigned_teacher: null,
          total_hours: 3
        }
      ];

      setTeachers(sampleTeachers);
      setSubjects(sampleSubjects);
      
      // Initialize workload summary
      const workload = {};
      sampleTeachers.forEach(teacher => {
        workload[teacher.mis_id] = {
          assigned: 0,
          remaining: teacher.max_hours,
          subjects: []
        };
      });
      setWorkloadSummary(workload);
      
      setLoading(false);
    }, 1500);
  }, []);

  const assignSubjectToTeacher = (subjectCode, teacherId) => {
    const subject = subjects.find(s => s.code === subjectCode);
    const teacher = teachers.find(t => t.mis_id === teacherId);
    
    if (!subject || !teacher) return;

    // Check if teacher has capacity
    const currentWorkload = workloadSummary[teacherId];
    if (currentWorkload.assigned + subject.total_hours > teacher.max_hours) {
      alert(`${teacher.name} cannot be assigned ${subject.name}. Would exceed maximum hours (${teacher.max_hours}h/week)`);
      return;
    }

    // Check shift compatibility
    if (teacher.preferred_shift === 'Morning' && subject.semester === 3) {
      // 3rd semester is morning shift - good match
    } else if (teacher.preferred_shift === 'General') {
      // General shift teachers can handle any shift
    } else {
      // Add a warning for shift mismatch
      setConflicts(prev => [...prev.filter(c => c.subject !== subjectCode), {
        type: 'shift_mismatch',
        subject: subjectCode,
        teacher: teacherId,
        message: `${teacher.name} prefers ${teacher.preferred_shift} shift but ${subject.name} is in morning shift`
      }]);
    }

    // Remove previous assignment if exists
    if (assignments[subjectCode]) {
      const prevTeacherId = assignments[subjectCode];
      const prevSubject = subjects.find(s => s.code === subjectCode);
      setWorkloadSummary(prev => ({
        ...prev,
        [prevTeacherId]: {
          ...prev[prevTeacherId],
          assigned: prev[prevTeacherId].assigned - prevSubject.total_hours,
          remaining: prev[prevTeacherId].remaining + prevSubject.total_hours,
          subjects: prev[prevTeacherId].subjects.filter(s => s !== subjectCode)
        }
      }));
    }

    // Make new assignment
    setAssignments(prev => ({
      ...prev,
      [subjectCode]: teacherId
    }));

    // Update workload
    setWorkloadSummary(prev => ({
      ...prev,
      [teacherId]: {
        ...prev[teacherId],
        assigned: prev[teacherId].assigned + subject.total_hours,
        remaining: prev[teacherId].remaining - subject.total_hours,
        subjects: [...prev[teacherId].subjects, subjectCode]
      }
    }));

    // Update subject assignment
    setSubjects(prev => prev.map(s => 
      s.code === subjectCode 
        ? { ...s, assigned_teacher: teacherId }
        : s
    ));
  };

  const autoAssign = () => {
    setLoading(true);
    
    setTimeout(() => {
      const newAssignments = {};
      const newWorkload = { ...workloadSummary };
      
      // Reset all assignments
      Object.keys(newWorkload).forEach(teacherId => {
        newWorkload[teacherId] = {
          assigned: 0,
          remaining: teachers.find(t => t.mis_id === teacherId).max_hours,
          subjects: []
        };
      });

      // Sort subjects by priority (complex subjects first)
      const sortedSubjects = [...subjects].sort((a, b) => {
        const aHours = parseInt(a.weekly_load.split(',')[0]) + parseInt(a.weekly_load.split(',')[1]);
        const bHours = parseInt(b.weekly_load.split(',')[0]) + parseInt(b.weekly_load.split(',')[1]);
        return bHours - aHours;
      });

      // Assign based on teacher preferences and availability
      sortedSubjects.forEach(subject => {
        // Find teachers who prefer this subject
        const preferredTeachers = teachers.filter(teacher => 
          teacher.subject_preferences.includes(subject.code)
        ).sort((a, b) => {
          // Sort by preference order and availability
          const aIndex = a.subject_preferences.indexOf(subject.code);
          const bIndex = b.subject_preferences.indexOf(subject.code);
          return aIndex - bIndex;
        });

        // Try to assign to preferred teacher with capacity
        for (const teacher of preferredTeachers) {
          if (newWorkload[teacher.mis_id].assigned + subject.total_hours <= teacher.max_hours) {
            newAssignments[subject.code] = teacher.mis_id;
            newWorkload[teacher.mis_id].assigned += subject.total_hours;
            newWorkload[teacher.mis_id].remaining -= subject.total_hours;
            newWorkload[teacher.mis_id].subjects.push(subject.code);
            break;
          }
        }
      });

      setAssignments(newAssignments);
      setWorkloadSummary(newWorkload);
      
      // Update subjects
      setSubjects(prev => prev.map(subject => ({
        ...subject,
        assigned_teacher: newAssignments[subject.code] || null
      })));
      
      setLoading(false);
    }, 2000);
  };

  const saveAssignments = () => {
    setSaving(true);
    
    // Simulate saving to backend
    setTimeout(() => {
      setSaving(false);
      alert('Teacher assignments saved successfully!');
    }, 1000);
  };

  const resetAssignments = () => {
    setAssignments({});
    setWorkloadSummary(prev => {
      const reset = {};
      Object.keys(prev).forEach(teacherId => {
        const teacher = teachers.find(t => t.mis_id === teacherId);
        reset[teacherId] = {
          assigned: 0,
          remaining: teacher.max_hours,
          subjects: []
        };
      });
      return reset;
    });
    setSubjects(prev => prev.map(s => ({ ...s, assigned_teacher: null })));
    setConflicts([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading teacher assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
              <h1 className="text-4xl font-bold text-black mb-2">Teacher Assignment</h1>
              <p className="text-gray-600">Assign subjects to teachers based on preferences and workload</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={resetAssignments}
              className="px-4 py-2 text-gray-600 hover:text-black transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={autoAssign}
              className="px-6 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Auto Assign
            </button>
            <button
              onClick={saveAssignments}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              disabled={saving}
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save & Continue'}</span>
            </button>
          </div>
        </div>

        {/* Conflicts Alert */}
        {conflicts.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Conflicts Detected</h3>
            </div>
            <div className="space-y-1">
              {conflicts.map((conflict, index) => (
                <p key={index} className="text-yellow-700 text-sm">{conflict.message}</p>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Teachers Workload Summary */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-black mb-6">Teachers Workload</h2>
            <div className="space-y-4">
              {teachers.map(teacher => {
                const workload = workloadSummary[teacher.mis_id];
                const utilizationPercent = (workload.assigned / teacher.max_hours) * 100;
                
                return (
                  <div key={teacher.mis_id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-black text-lg">{teacher.name}</h3>
                        <p className="text-gray-600 text-sm">{teacher.designation}</p>
                        <p className="text-gray-500 text-xs">{teacher.preferred_shift} Shift</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-black">
                          {workload.assigned}/{teacher.max_hours}h
                        </div>
                        <div className="text-sm text-gray-600">
                          {workload.remaining}h remaining
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            utilizationPercent > 90 ? 'bg-red-500' : 
                            utilizationPercent > 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {utilizationPercent.toFixed(0)}% utilized
                      </div>
                    </div>

                    {/* Assigned Subjects */}
                    <div>
                      <h4 className="font-semibold text-black text-sm mb-2">Assigned Subjects:</h4>
                      {workload.subjects.length > 0 ? (
                        <div className="space-y-1">
                          {workload.subjects.map(subjectCode => {
                            const subject = subjects.find(s => s.code === subjectCode);
                            return (
                              <div key={subjectCode} className="flex items-center justify-between bg-white rounded px-3 py-1">
                                <span className="text-sm text-gray-700">{subject?.name}</span>
                                <span className="text-xs text-gray-500">{subject?.total_hours}h</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No subjects assigned</p>
                      )}
                    </div>

                    {/* Preferred Subjects */}
                    <div className="mt-4">
                      <h4 className="font-semibold text-black text-sm mb-2">Preferences:</h4>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subject_preferences.map(subjectCode => (
                          <span key={subjectCode} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {subjectCode}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subject Assignment */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-black mb-6">Subject Assignment</h2>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Subject</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Department</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Semester</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Load (T,L)</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Hours/Week</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Assigned Teacher</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-black">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subjects.map(subject => {
                      const assignedTeacher = assignments[subject.code] ? 
                        teachers.find(t => t.mis_id === assignments[subject.code]) : null;
                      
                      return (
                        <tr key={subject.code} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-black">{subject.name}</div>
                              <div className="text-sm text-gray-600">{subject.code}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{subject.department}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{subject.semester}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{subject.weekly_load}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{subject.total_hours}h</td>
                          <td className="px-6 py-4">
                            <select 
                              value={assignments[subject.code] || ''} 
                              onChange={(e) => assignSubjectToTeacher(subject.code, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                            >
                              <option value="">Select Teacher</option>
                              {teachers.map(teacher => {
                                const canAssign = workloadSummary[teacher.mis_id].remaining >= subject.total_hours || 
                                                assignments[subject.code] === teacher.mis_id;
                                const isPreferred = teacher.subject_preferences.includes(subject.code);
                                
                                return (
                                  <option 
                                    key={teacher.mis_id} 
                                    value={teacher.mis_id}
                                    disabled={!canAssign}
                                    className={isPreferred ? 'bg-blue-50' : ''}
                                  >
                                    {teacher.name} ({teacher.designation})
                                    {isPreferred && ' ⭐'}
                                    {!canAssign && ' (No capacity)'}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            {assignedTeacher ? (
                              <div className="flex items-center space-x-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm">Assigned</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1 text-gray-400">
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

            {/* Assignment Summary */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Object.keys(assignments).length}
                </div>
                <div className="text-sm text-green-800">Subjects Assigned</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {subjects.length - Object.keys(assignments).length}
                </div>
                <div className="text-sm text-yellow-800">Pending Assignment</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {teachers.filter(t => workloadSummary[t.mis_id]?.subjects.length > 0).length}
                </div>
                <div className="text-sm text-blue-800">Teachers Utilized</div>
              </div>
            </div>

            {/* Continue Button */}
            {Object.keys(assignments).length === subjects.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => onNext && onNext()}
                  className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold"
                >
                  Continue to Timetable Generation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignmentPage;