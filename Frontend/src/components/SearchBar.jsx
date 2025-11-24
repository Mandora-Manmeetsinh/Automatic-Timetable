import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="mb-10">
      <div className="relative max-w-3xl flex items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
          <input
            type="text"
            placeholder="Search for timetables, teachers, or classes..."
            className="w-full pl-14 pr-6 py-4 bg-white border-2 border-zinc-100 rounded-2xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-base shadow-sm hover:shadow-md"
          />
        </div>
        <button className="ml-4 p-4 bg-white border-2 border-zinc-100 rounded-2xl text-zinc-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all duration-300">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;