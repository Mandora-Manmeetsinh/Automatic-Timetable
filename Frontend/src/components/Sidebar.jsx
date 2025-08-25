import React from 'react';
import { Home, Users, Settings, BarChart3, Calendar, Mail, Bell, Search } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Users, label: 'Users' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Calendar, label: 'Calendar' },
    { icon: Mail, label: 'Messages' },
    { icon: Bell, label: 'Notifications' },
    { icon: Search, label: 'Search' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-black h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm"></div>
          </div>
          <span className="text-white font-semibold text-lg">Dashboard</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-white text-black' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;