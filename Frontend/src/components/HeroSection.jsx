import React from 'react';
import image from '../assets/image.png';

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between mb-12 bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-2xl shadow-md p-8">
      <div className="flex-1 md:pr-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Good morning, Explorer
        </h1>
        <div className="mb-8">
          <p className="text-gray-700 mb-1 text-lg">
            Your Catch Up page is bustling with activity.
          </p>
          <p className="text-gray-500 text-base">
            Get up to speed on <span className="font-semibold text-black">15 notifications</span> from <span className="font-semibold text-black">5 plans</span>.
          </p>
        </div>
        <button
          onClick={onGetStarted}
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-base shadow"
        >
          Get started
        </button>
      </div>
      <div className="mt-8 md:mt-0 md:ml-12 flex-shrink-0 flex items-center justify-center">
        <div className="bg-gradient-to-br from-yellow-100 via-white to-gray-200 rounded-2xl p-4 shadow-lg">
          <img
            src={image}
            alt="Pikachuuuuuuuuuuuu"
            className="w-48 h-48 object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;