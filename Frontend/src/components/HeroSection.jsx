import React from 'react';

const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="flex items-start justify-between mb-12">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-black mb-4">Good morning, Explorer</h1>
        <div className="mb-8">
          <p className="text-gray-600 mb-1 text-base">Your Catch Up page is bustling with activity. Get up to speed on 15 notifications</p>
          <p className="text-gray-600 text-base">from 5 plans.</p>
        </div>
        <button 
          onClick={onGetStarted}
          className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
        >
          Get started
        </button>
      </div>
      
      {/* Gradient Rectangle */}
      <div className="ml-12">
        <div className="w-32 h-24 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-xl"></div>
      </div>
    </div>
  );
};

export default HeroSection;