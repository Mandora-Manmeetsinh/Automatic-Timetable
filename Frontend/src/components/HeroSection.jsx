import React from 'react';
import { ArrowRight, BarChart2, Users, Calendar, Clock, CheckCircle, Activity } from 'lucide-react';

const HeroSection = ({ onGetStarted, onNavigate }) => {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Content */}
          <div className="max-w-2xl">
            <h1 className="font-julius text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Intelligent Scheduling <br />
              <span className="text-gray-400">for Modern Institutions.</span>
            </h1>

            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg">
              Automate your academic timetabling with our AI-driven engine. Optimize resource utilization, eliminate conflicts, and streamline operations with a single click.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button
                onClick={onGetStarted}
                className="group flex items-center justify-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl min-w-[160px]"
              >
                <span>Start Generating</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors border border-gray-200 hover:border-gray-300 min-w-[160px]">
                <Activity className="w-4 h-4" />
                <span>View Demo</span>
              </button>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-500 mt-1">Conflict Free</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">15m</p>
                <p className="text-sm text-gray-500 mt-1">Setup Time</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-500 mt-1">Availability</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Widget */}
          <div className="relative lg:ml-auto w-full max-w-lg">
            {/* Main Dashboard Card */}
            <div
              onClick={() => onNavigate && onNavigate('timetable-output')}
              className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="text-xs font-medium text-gray-400 group-hover:text-indigo-500 transition-colors">Click to Preview</div>
              </div>

              {/* Card Body - Mock Schedule */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">CSE - Semester 3</h3>
                    <p className="text-xs text-gray-500">Week 12 • Room 304</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-md border border-emerald-100">Active</span>
                </div>

                {/* Schedule Items */}
                <div className="space-y-3">
                  {[
                    { time: '09:00 AM', subject: 'Data Structures', type: 'Lecture', color: 'bg-blue-50 text-blue-700 border-blue-100' },
                    { time: '10:30 AM', subject: 'Database Systems', type: 'Lab', color: 'bg-purple-50 text-purple-700 border-purple-100' },
                    { time: '01:00 PM', subject: 'Operating Systems', type: 'Lecture', color: 'bg-orange-50 text-orange-700 border-orange-100' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-default group-hover:border-indigo-50">
                      <div className="w-20 text-xs font-medium text-gray-500">{item.time}</div>
                      <div className={`flex-1 ml-4 p-2 rounded-md border ${item.color} text-xs font-medium flex justify-between items-center`}>
                        <span>{item.subject}</span>
                        <span className="opacity-75 text-[10px] uppercase tracking-wider">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Utilization Graph Mock */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">Room Utilization</span>
                    <span className="text-xs font-bold text-gray-900">85%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gray-900 h-1.5 rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-4 top-12 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-bounce-slow hidden sm:block pointer-events-none">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-bold text-gray-900">Optimized</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;