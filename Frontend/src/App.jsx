import React, { useState } from "react";

const FirstTimeInput = () => {
  const [selectedTab, setSelectedTab] = useState("OS");

  return (
    <div className="min-h-screen bg-[#F4F3F8] p-8 font-[var(--font-saro)] text-[#1A1A1A] flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <label className="block text-2xl font-bold mb-4 text-[#1A1A1A] font-[var(--font-saro)]">Semester:</label>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-xl mb-6 bg-[#EDEDF2] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#7D67FF] font-[var(--font-inter)]"
          placeholder="Enter semester"
        />

        {/* Tab Selection */}
        <div className="flex justify-center space-x-4 mb-6">
          {["OS", "DSA", "PSIM"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all font-[var(--font-inter)] ${
                selectedTab === tab ? "bg-[#7D67FF] text-white" : "bg-[#EDEDF2] text-[#1A1A1A]"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Placeholder for Graph/Stats Section */}
        <div className="bg-[#EDEDF2] h-56 rounded-xl mb-8 flex items-center justify-center shadow-md">
          <span className="text-[#7D67FF] font-semibold font-[var(--font-inter)]">Graph / Stats Placeholder</span>
        </div>

        {/* Batch Entry Section */}
        <div className="border border-[#EDEDF2] rounded-xl p-6 bg-white shadow-md">
          <div className="flex justify-center space-x-4 mb-6">
            <button className="px-6 py-3 bg-[#7D67FF] text-white rounded-xl font-[var(--font-inter)]">OS</button>
            <button className="px-6 py-3 bg-[#EDEDF2] text-[#1A1A1A] rounded-xl font-[var(--font-inter)]">DSA</button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {["Batch 1", "Batch 2"].map((batch) => (
              <div key={batch} className="border border-[#EDEDF2] p-6 rounded-xl shadow-sm">
                <h3 className="font-bold mb-4 text-[#1A1A1A] text-xl font-[var(--font-saro)] text-center">{batch}</h3>
                {[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-xl mb-3 bg-[#EDEDF2] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#7D67FF] font-[var(--font-inter)]"
                    placeholder="Enter value"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeInput;
