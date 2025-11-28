import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle, Save, RotateCcw, Clock, User, BookOpen, Star, Filter, Search } from 'lucide-react';

const TeacherAssignmentPage = ({ onBack, onNext }) => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [workloadSummary, setWorkloadSummary] = useState({});
  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

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
          max_hours: 16,
          shift: 'Morning',
          preferred_shift: 'Morning',
          avatar_color: 'bg-emerald-100 text-emerald-700'
        },
        {
          mis_id: 'T2',
          name: 'Amit Singh',
          email: 'amit@abc.edu',
          designation: 'Subject Head',
          subject_preferences: ['CS104', 'CS105'],
          max_hours: 4,
          shift: 'Morning',
          preferred_shift: 'General',
          avatar_color: 'bg-blue-100 text-blue-700'
        },
        {
          mis_id: 'T3',
          name: 'Neha Patel',
          email: 'neha@abc.edu',
          designation: 'Professor',
          subject_preferences: ['CS106', 'CS107'],
          max_hours: 16,
          shift: 'Morning',
          preferred_shift: 'Morning',
          avatar_color: 'bg-purple-100 text-purple-700'
        },
        {
          mis_id: 'T4',
          name: 'Rahul Verma',
          email: 'rahul@abc.edu',
          designation: 'Assistant Professor',
          subject_preferences: ['CS108', 'CS109'],
          max_hours: 16,
          shift: 'Morning',
          preferred_shift: 'General',
          avatar_color: 'bg-orange-100 text-orange-700'
        }
      ];

      const sampleSubjects = [
        {
          code: 'CS101',
          name: 'Operating Systems',
          department: 'CSE',
          semester: 3,
          weekly_load: '3,1',
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
      setSelectedSubject(sampleSubjects[0]);

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
    }, 1000);
  }, []);

  const assignSubjectToTeacher = (subjectCode, teacherId) => {
    const subject = subjects.find(s => s.code === subjectCode);
    const teacher = teachers.find(t => t.mis_id === teacherId);

    if (!subject || !teacher) return;

    // Check if teacher has capacity
    const currentWorkload = workloadSummary[teacherId];
    // Allow re-assignment if it's the same teacher (no-op) or if switching
    const isReassignment = assignments[subjectCode] === teacherId;

    if (!isReassignment && currentWorkload.assigned + subject.total_hours > teacher.max_hours) {
      alert(`${teacher.name} cannot be assigned ${subject.name}. Would exceed maximum hours (${teacher.max_hours}h/week)`);
      return;
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

  const removeAssignment = (subjectCode) => {
    const teacherId = assignments[subjectCode];
    if (!teacherId) return;

    const subject = subjects.find(s => s.code === subjectCode);

    setWorkloadSummary(prev => ({
      ...prev,
      [teacherId]: {
        ...prev[teacherId],
        assigned: prev[teacherId].assigned - subject.total_hours,
        remaining: prev[teacherId].remaining + subject.total_hours,
        subjects: prev[teacherId].subjects.filter(s => s !== subjectCode)
      }
    }));

    const newAssignments = { ...assignments };
    delete newAssignments[subjectCode];
    setAssignments(newAssignments);

    setSubjects(prev => prev.map(s =>
      s.code === subjectCode
        ? { ...s, assigned_teacher: null }
        : s
    ));
  };

  const calculateTeacherScore = (teacher, subject, currentWorkload) => {
    let score = 0;
    const workload = currentWorkload[teacher.mis_id];

    // 1. Hard Constraint: Capacity Check
    if (workload.assigned + subject.total_hours > teacher.max_hours) {
      return -10000; // Impossible assignment
    }

    // 2. Preference Match (Dominant Factor)
    if (teacher.subject_preferences.includes(subject.code)) {
      score += 1000;
      // Bonus for preference order
      const prefIndex = teacher.subject_preferences.indexOf(subject.code);
      score += (10 - prefIndex) * 10;
    }

    // 3. Designation Priority (Seniority)
    const designationScores = {
      'HOD': 50,
      'Subject Head': 45,
      'Professor': 40,
      'Associate Professor': 35,
      'Assistant Professor': 30,
      'Lecturer': 20
    };
    score += designationScores[teacher.designation] || 0;

    // 4. Workload Balancing (Penalty for high load)
    score -= (workload.assigned * 5);

    // 5. Shift Compatibility
    if (teacher.preferred_shift === 'General' ||
      (teacher.preferred_shift === 'Morning' && subject.semester === 3)) {
      score += 10;
    }

    return score;
  };

  const autoAssign = () => {
    setLoading(true);

    setTimeout(() => {
      const newAssignments = {};
      const newWorkload = { ...workloadSummary };

      // Reset all assignments first
      Object.keys(newWorkload).forEach(teacherId => {
        newWorkload[teacherId] = {
          assigned: 0,
          remaining: teachers.find(t => t.mis_id === teacherId).max_hours,
          subjects: []
        };
      });

      // Sort subjects by priority (complex subjects first)
      const sortedSubjects = [...subjects].sort((a, b) => b.total_hours - a.total_hours);

      // Smart Assignment Algorithm
      sortedSubjects.forEach(subject => {
        let bestTeacher = null;
        let highestScore = -Infinity;

        teachers.forEach(teacher => {
          const score = calculateTeacherScore(teacher, subject, newWorkload);

          if (score > highestScore) {
            highestScore = score;
            bestTeacher = teacher;
          }
        });

        if (bestTeacher && highestScore > -5000) {
          newAssignments[subject.code] = bestTeacher.mis_id;
          newWorkload[bestTeacher.mis_id].assigned += subject.total_hours;
          newWorkload[bestTeacher.mis_id].remaining -= subject.total_hours;
          newWorkload[bestTeacher.mis_id].subjects.push(subject.code);
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
    }, 800);
  };

  const resetAssignments = () => {
    setAssignments({});
    const resetWorkload = {};
    teachers.forEach(teacher => {
      resetWorkload[teacher.mis_id] = {
        assigned: 0,
        remaining: teacher.max_hours,
        subjects: []
      };
    });
    setWorkloadSummary(resetWorkload);
    setSubjects(prev => prev.map(s => ({ ...s, assigned_teacher: null })));
    setConflicts([]);
  };

  const saveAssignments = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      if (onNext) {
        onNext(assignments);
      }
    }, 1000);
  };

  // Stats
  const totalSubjects = subjects.length;
  const assignedCount = Object.keys(assignments).length;
  const progressPercent = Math.round((assignedCount / totalSubjects) * 100);
  const warningCount = conflicts.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center font-['Space_Grotesk']">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#f48c25] mx-auto mb-4"></div>
          <p className="text-[#9c7349] text-lg">Loading teacher data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5] font-['Space_Grotesk'] text-[#1c140d] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[#9c7349] hover:text-[#1c140d] transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#1c140d]">Assign Subjects</h1>
            <p className="text-[#9c7349] text-sm mt-1">Smart allocation based on preferences and workload</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={resetAssignments}
            className="px-4 py-2 bg-white text-[#1c140d] border border-[#e8dbce] rounded-lg hover:bg-[#f8f7f5] transition-colors flex items-center space-x-2 font-medium text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={autoAssign}
            className="px-5 py-2 bg-[#1c140d] text-white rounded-lg hover:bg-[#333] transition-colors font-bold shadow-md text-sm flex items-center space-x-2"
          >
            <Star className="w-4 h-4" />
            <span>Smart Auto-Assign</span>
          </button>
          <button
            onClick={saveAssignments}
            className="px-5 py-2 bg-[#f48c25] text-white rounded-lg hover:bg-[#d6761b] transition-colors flex items-center space-x-2 font-bold shadow-md text-sm"
            disabled={saving}
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save & Continue'}</span>
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-[#e8dbce] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[#9c7349] text-xs font-bold uppercase tracking-wider mb-1">Teachers</p>
            <div className="text-2xl font-black text-[#1c140d]">{teachers.length}</div>
          </div>
          <div className="bg-[#f8f7f5] p-2.5 rounded-lg text-[#1c140d]">
            <User className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e8dbce] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[#9c7349] text-xs font-bold uppercase tracking-wider mb-1">Assigned</p>
            <div className="text-2xl font-black text-[#1c140d]">{assignedCount}/{totalSubjects}</div>
          </div>
          <div className={`p-2.5 rounded-lg ${progressPercent === 100 ? 'bg-green-100 text-green-700' : 'bg-[#f8f7f5] text-[#1c140d]'}`}>
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e8dbce] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[#9c7349] text-xs font-bold uppercase tracking-wider mb-1">Warnings</p>
            <div className="text-2xl font-black text-[#1c140d]">{warningCount}</div>
          </div>
          <div className={`${warningCount > 0 ? 'bg-orange-100 text-orange-700' : 'bg-[#f8f7f5] text-[#1c140d]'} p-2.5 rounded-lg`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e8dbce] shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[#9c7349] text-xs font-bold uppercase tracking-wider">Progress</p>
            <span className="text-sm font-bold text-[#1c140d]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#f8f7f5] rounded-full h-2">
            <div
              className="bg-[#f48c25] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)]">

        {/* Left Column: Available Subjects */}
        <div className="lg:col-span-4 flex flex-col h-full bg-white border border-[#e8dbce] rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e8dbce] bg-[#fcfbf9] flex justify-between items-center">
            <h2 className="font-bold text-[#1c140d] flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-[#9c7349]" />
              Subjects
            </h2>
            <span className="text-xs font-medium bg-[#f8f7f5] px-2 py-1 rounded-full text-[#9c7349]">
              {totalSubjects - assignedCount} remaining
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {subjects.map(subject => {
              const isSelected = selectedSubject?.code === subject.code;
              const isAssigned = !!assignments[subject.code];
              const assignedTeacher = isAssigned ? teachers.find(t => t.mis_id === assignments[subject.code]) : null;

              return (
                <div
                  key={subject.code}
                  onClick={() => setSelectedSubject(subject)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer relative group ${isSelected
                    ? 'border-[#f48c25] bg-[#fff8f1] shadow-sm'
                    : 'border-transparent hover:bg-[#f8f7f5] hover:border-[#e8dbce]'
                    }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-sm ${isSelected ? 'text-[#1c140d]' : 'text-[#555]'}`}>{subject.name}</h3>
                    {isAssigned ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border-2 ${isSelected ? 'border-[#f48c25]' : 'border-[#e8dbce]'}`}></div>
                    )}
                  </div>

                  <div className="text-xs text-[#9c7349] flex items-center space-x-2">
                    <span className="font-mono">{subject.code}</span>
                    <span>•</span>
                    <span>{subject.total_hours}h</span>
                  </div>

                  {isAssigned && assignedTeacher && (
                    <div className="flex items-center mt-2 pt-2 border-t border-[#e8dbce]/50">
                      <div className={`w-5 h-5 rounded-full ${assignedTeacher.avatar_color} flex items-center justify-center text-[10px] font-bold mr-1.5`}>
                        {assignedTeacher.name.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-[#1c140d] truncate">{assignedTeacher.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Teachers / Assignment Detail */}
        <div className="lg:col-span-8 flex flex-col h-full bg-white border border-[#e8dbce] rounded-xl shadow-sm overflow-hidden">
          {selectedSubject ? (
            <>
              <div className="p-6 border-b border-[#e8dbce] bg-[#fcfbf9]">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1c140d] mb-2">{selectedSubject.name}</h2>
                    <div className="flex items-center space-x-3 text-sm text-[#9c7349]">
                      <span className="bg-[#fff] px-2 py-0.5 rounded border border-[#e8dbce] font-mono text-xs">{selectedSubject.code}</span>
                      <span>{selectedSubject.total_hours} Hours/Week</span>
                      <span>Semester {selectedSubject.semester}</span>
                    </div>
                  </div>
                  {assignments[selectedSubject.code] && (
                    <button
                      onClick={() => removeAssignment(selectedSubject.code)}
                      className="text-sm text-red-600 hover:text-red-800 font-bold px-3 py-1.5 bg-red-50 rounded-lg border border-red-100 transition-colors"
                    >
                      Unassign
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-[#f8f7f5]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-[#9c7349] uppercase tracking-wider">Select a Teacher</h3>
                  <div className="text-xs text-[#9c7349] bg-white px-2 py-1 rounded border border-[#e8dbce]">
                    Sorted by: Preference & Seniority
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...teachers]
                    .sort((a, b) => {
                      if (selectedSubject) {
                        const scoreA = calculateTeacherScore(a, selectedSubject, workloadSummary);
                        const scoreB = calculateTeacherScore(b, selectedSubject, workloadSummary);
                        return scoreB - scoreA;
                      }
                      return 0;
                    })
                    .map(teacher => {
                      const workload = workloadSummary[teacher.mis_id];
                      const utilization = (workload.assigned / teacher.max_hours) * 100;
                      const isAssignedToThis = assignments[selectedSubject.code] === teacher.mis_id;
                      const isPreferred = teacher.subject_preferences.includes(selectedSubject.code);
                      const canAssign = workload.remaining >= selectedSubject.total_hours || isAssignedToThis;

                      const score = calculateTeacherScore(teacher, selectedSubject, workloadSummary);
                      const isHighPriority = score > 500;

                      return (
                        <div
                          key={teacher.mis_id}
                          onClick={() => canAssign && assignSubjectToTeacher(selectedSubject.code, teacher.mis_id)}
                          className={`border rounded-xl p-4 transition-all cursor-pointer relative ${isAssignedToThis
                            ? 'border-[#f48c25] bg-white ring-2 ring-[#f48c25] ring-opacity-50 shadow-md'
                            : canAssign
                              ? 'border-[#e8dbce] bg-white hover:border-[#9c7349] hover:shadow-md'
                              : 'border-[#e8dbce] bg-gray-50 opacity-60 cursor-not-allowed'
                            }`}
                        >
                          {isPreferred && (
                            <div className="absolute top-3 right-3 flex flex-col items-end">
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500 mb-1" />
                              {isHighPriority && (
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                                  Best Match
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-10 h-10 rounded-full ${teacher.avatar_color} flex items-center justify-center font-bold text-lg`}>
                              {teacher.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-[#1c140d] text-sm">{teacher.name}</h4>
                              <p className="text-xs text-[#9c7349]">{teacher.designation}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#9c7349]">Workload</span>
                              <span className="font-bold text-[#1c140d]">{workload.assigned}/{teacher.max_hours}h</span>
                            </div>
                            <div className="w-full bg-[#f8f7f5] rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${utilization > 90 ? 'bg-red-500' :
                                  utilization > 70 ? 'bg-amber-500' : 'bg-green-500'
                                  }`}
                                style={{ width: `${Math.min(utilization, 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs pt-1">
                              <span className="text-[#9c7349]">Remaining</span>
                              <span className="font-medium text-[#1c140d]">{workload.remaining}h</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="bg-[#f8f7f5] p-6 rounded-full mb-4">
                <BookOpen className="w-12 h-12 text-[#e8dbce]" />
              </div>
              <h3 className="text-xl font-bold text-[#1c140d] mb-2">No Subject Selected</h3>
              <p className="text-[#9c7349] max-w-xs">Select a subject from the list on the left to view eligible teachers and make assignments.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TeacherAssignmentPage;