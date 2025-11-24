import React from 'react';
import { Calendar, MoreHorizontal, CheckCircle2 } from 'lucide-react';

const RecordList = () => {
  const onboardingPlans = [
    {
      id: 1,
      company: 'Apple Inc.',
      plan: 'Onboarding plan for Apple',
      progress: '8/15',
      date: 'Feb 15',
      color: 'bg-zinc-800'
    },
    {
      id: 2,
      company: 'Google LLC',
      plan: 'Onboarding plan for Google',
      progress: '12/20',
      date: 'Mar 1',
      color: 'bg-zinc-800'
    },
    {
      id: 3,
      company: 'Microsoft Corporation',
      plan: 'Onboarding plan for Microsoft',
      progress: '16/25',
      date: 'Apr 5',
      color: 'bg-zinc-800'
    },
    {
      id: 4,
      company: 'Meta Platforms, Inc.',
      plan: 'Onboarding plan for Meta',
      progress: '10/18',
      date: 'Mar 20',
      color: 'bg-zinc-800'
    }
  ];

  return (
    <div className="space-y-4">
      {onboardingPlans.map((plan) => (
        <div
          key={plan.id}
          className="group bg-white hover:bg-zinc-50 rounded-2xl p-5 border border-zinc-200 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              {/* Company Logo Placeholder */}
              <div className="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center border border-zinc-200 group-hover:scale-105 transition-transform duration-300">
                <div className="w-7 h-7 bg-black rounded-md shadow-sm"></div>
              </div>

              {/* Plan Details */}
              <div>
                <h3 className="font-bold text-zinc-900 mb-1 text-lg group-hover:text-blue-600 transition-colors">{plan.plan}</h3>
                <p className="text-zinc-500 text-sm font-medium">{plan.company}</p>
              </div>
            </div>

            {/* Progress and Date Info */}
            <div className="flex items-center space-x-8">
              {/* Progress */}
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-zinc-200" />
                    <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray="100" strokeDashoffset="40" className="text-blue-500" />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-zinc-700">50%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400 font-medium uppercase">Progress</span>
                  <span className="text-sm font-bold text-zinc-700">{plan.progress}</span>
                </div>
              </div>

              {/* Date */}
              <div className="hidden md:flex items-center space-x-2 text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-semibold">{plan.date}</span>
              </div>

              {/* More Options */}
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordList;