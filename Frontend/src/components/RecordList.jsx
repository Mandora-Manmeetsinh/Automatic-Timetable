import React from 'react';
import { Calendar, MoreHorizontal } from 'lucide-react';

const RecordList = () => {
  const onboardingPlans = [
    {
      id: 1,
      company: 'Apple Inc.',
      plan: 'Onboarding plan for Apple',
      progress: '8/15',
      date: 'Feb 15',
      bgColor: 'bg-gray-700'
    },
    {
      id: 2,
      company: 'Google LLC',
      plan: 'Onboarding plan for Google',
      progress: '12/20',
      date: 'Mar 1',
      bgColor: 'bg-gray-700'
    },
    {
      id: 3,
      company: 'Microsoft Corporation',
      plan: 'Onboarding plan for Microsoft',
      progress: '16/25',
      date: 'Apr 5',
      bgColor: 'bg-gray-700'
    },
    {
      id: 4,
      company: 'Meta Platforms, Inc.',
      plan: 'Onboarding plan for Meta',
      progress: '10/18',
      date: 'Mar 20',
      bgColor: 'bg-gray-700'
    }
  ];

  return (
    <div className="space-y-4">
      {onboardingPlans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 shadow-sm"
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
              <button className="text-gray-500 hover:text-black transition-colors p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordList;