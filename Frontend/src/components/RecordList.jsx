import React, { useState } from 'react';
import { Calendar, MoreHorizontal, X } from 'lucide-react';

// Demo timetable data for preview (reference from TimetableOutputPage)
const previewDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const previewTimeSlots = ['9:00-10:00', '10:00-11:00', '11:00-12:00'];
const previewData = {
  1: {
    className: 'CSE-A-3',
    table: {
      'Mon': [
        { time: '9:00-10:00', subject: 'OS', teacher: 'Rumi', type: 'Theory' },
        { time: '10:00-11:00', subject: 'DB', teacher: 'Amit', type: 'Theory' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ],
      'Tue': [
        { time: '9:00-10:00', subject: 'CN', teacher: 'Neha', type: 'Theory' },
        { time: '10:00-11:00', subject: 'OS Lab', teacher: 'Rumi', type: 'Lab' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ],
      'Wed': [
        { time: '9:00-10:00', subject: 'SE', teacher: 'Rahul', type: 'Theory' },
        { time: '10:00-11:00', subject: 'DB Lab', teacher: 'Amit', type: 'Lab' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ],
      'Thu': [
        { time: '9:00-10:00', subject: 'OS', teacher: 'Rumi', type: 'Theory' },
        { time: '10:00-11:00', subject: 'CN', teacher: 'Neha', type: 'Theory' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ],
      'Fri': [
        { time: '9:00-10:00', subject: 'SE', teacher: 'Rahul', type: 'Theory' },
        { time: '10:00-11:00', subject: 'OS Lab', teacher: 'Rumi', type: 'Lab' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ]
    }
  },
  2: {
    className: 'CSE-B-3',
    table: {
      'Mon': [
        { time: '9:00-10:00', subject: 'CN', teacher: 'Neha', type: 'Theory' },
        { time: '10:00-11:00', subject: 'OS', teacher: 'Rumi', type: 'Theory' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ],
      'Tue': [
        { time: '9:00-10:00', subject: 'DB', teacher: 'Amit', type: 'Theory' },
        { time: '10:00-11:00', subject: 'SE', teacher: 'Rahul', type: 'Theory' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ],
      'Wed': [
        { time: '9:00-10:00', subject: 'OS Lab', teacher: 'Rumi', type: 'Lab' },
        { time: '10:00-11:00', subject: 'DB Lab', teacher: 'Amit', type: 'Lab' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ],
      'Thu': [
        { time: '9:00-10:00', subject: 'SE', teacher: 'Rahul', type: 'Theory' },
        { time: '10:00-11:00', subject: 'CN', teacher: 'Neha', type: 'Theory' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ],
      'Fri': [
        { time: '9:00-10:00', subject: 'DB', teacher: 'Amit', type: 'Theory' },
        { time: '10:00-11:00', subject: 'OS', teacher: 'Rumi', type: 'Theory' },
        { time: '11:00-12:00', subject: 'Break', type: 'Break' }
      ]
    }
  }
  // Add more if needed for other plans
};

const getSubjectColor = (subject) => {
  const colors = {
    'OS': 'bg-blue-100 text-blue-800 border-blue-200',
    'DB': 'bg-green-100 text-green-800 border-green-200',
    'CN': 'bg-purple-100 text-purple-800 border-purple-200',
    'SE': 'bg-orange-100 text-orange-800 border-orange-200',
    'OS Lab': 'bg-blue-50 text-blue-900 border-blue-300',
    'DB Lab': 'bg-green-50 text-green-900 border-green-300',
    'Break': 'bg-gray-100 text-gray-600 border-gray-200'
  };
  return colors[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const RecordList = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const onboardingPlans = [
    {
      id: 1,
      company: 'CSE-A-3',
      plan: 'Timetable for CSE-A Semester 3',
      progress: '8/15',
      date: 'Feb 15',
      bgColor: 'bg-blue-700'
    },
    {
      id: 2,
      company: 'CSE-B-3',
      plan: 'Timetable for CSE-B Semester 3',
      progress: '12/20',
      date: 'Mar 1',
      bgColor: 'bg-green-700'
    },
    {
      id: 3,
      company: 'ECE-A-3',
      plan: 'Timetable for ECE-A Semester 3',
      progress: '16/25',
      date: 'Apr 5',
      bgColor: 'bg-purple-700'
    },
    {
      id: 4,
      company: 'MECH-A-3',
      plan: 'Timetable for MECH-A Semester 3',
      progress: '10/18',
      date: 'Mar 20',
      bgColor: 'bg-orange-700'
    }
  ];

  return (
    <div className="space-y-4">
      {onboardingPlans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-400 cursor-pointer transition-colors duration-200 shadow-sm"
          onClick={() => setSelectedPlan(plan)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Company Logo Placeholder */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <div className="w-6 h-6 bg-black rounded-sm"></div>
              </div>
              
              {/* Plan Details */}
              <div>
                <h3 className="font-semibold text-black mb-1 text-base">{plan.plan}</h3>
                <p className="text-gray-600 text-sm">{plan.company}</p>
              </div>
            </div>
            
            {/* Progress and Date Info */}
            <div className="flex items-center space-x-6">
              {/* Progress */}
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                <span className="text-sm font-medium">{plan.progress}</span>
              </div>
              
              {/* Date */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{plan.date}</span>
              </div>
              
              {/* More Options */}
              <button
                className="text-gray-500 hover:text-black transition-colors p-1"
                onClick={e => { e.stopPropagation(); /* handle more options if needed */ }}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for timetable preview */}
      {selectedPlan && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              onClick={() => setSelectedPlan(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              Timetable Preview for {previewData[selectedPlan.id]?.className || 'Class'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-200 rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-2 border border-gray-200">Time</th>
                    {previewDays.map(day => (
                      <th key={day} className="px-2 py-2 border border-gray-200">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewTimeSlots.map((slot, idx) => (
                    <tr key={slot} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-2 py-2 border border-gray-200 font-semibold">{slot}</td>
                      {previewDays.map(day => {
                        const entry = previewData[selectedPlan.id]?.table?.[day]?.find(e => e.time === slot);
                        return (
                          <td key={day} className="px-2 py-2 border border-gray-200">
                            {entry ? (
                              <div className={`rounded p-1 border text-xs ${getSubjectColor(entry.subject)}`}>
                                <div className="font-semibold">{entry.subject}</div>
                                {entry.teacher && <div className="text-gray-600">{entry.teacher}</div>}
                                {entry.type && entry.type !== 'Theory' && (
                                  <span className="text-[10px] px-1 py-0.5 rounded bg-gray-200 text-gray-700">{entry.type}</span>
                                )}
                              </div>
                            ) : (
                              <div className="h-8"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setSelectedPlan(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordList;