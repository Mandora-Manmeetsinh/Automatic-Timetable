import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="mb-8">
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base"
        />
      </div>
    </div>
  );
};

export default SearchBar;