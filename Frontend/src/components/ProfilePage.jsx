import React from 'react';
import { User, Mail, Briefcase, Calendar, Edit3, Shield, Clock, FileText, Activity, CheckCircle } from 'lucide-react';

const ProfilePage = () => {
    // Mock User Data
    const user = {
        name: "Manmeet sinh",
        username: "MUI_GOKU",
        email: "manmeet@university.edu",
        role: "Administrator",
        department: "Computer Science",
        joinDate: "September 2023",
        id: "ADM-2024-001",
        status: "Active",
        lastLogin: "Today, 10:42 AM",
        avatar: "MS"
    };

    // Mock Statistics
    const stats = [
        { label: "Timetables Created", value: "12", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Data Uploaded", value: "45 Files", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Active Sessions", value: "24h", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    // Mock Recent Activity
    const activities = [
        { action: "Generated Timetable for CS Batch A", time: "2 hours ago", icon: CheckCircle, color: "text-green-500" },
        { action: "Uploaded Faculty_List_2024.csv", time: "Yesterday, 4:30 PM", icon: FileText, color: "text-blue-500" },
        { action: "Updated System Settings", time: "Nov 22, 2024", icon: Activity, color: "text-purple-500" },
    ];

    return (
        <div className="flex-1 bg-gray-50 p-8 overflow-y-auto h-screen">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-light text-gray-800 tracking-wide" style={{ fontFamily: '"Julius Sans One", sans-serif' }}>
                            USER PROFILE
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">Manage your account settings and view activity.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                        <Edit3 size={16} />
                        Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Identity Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4 border-4 border-white shadow-md">
                                <span className="text-4xl font-light text-gray-600 tracking-widest" style={{ fontFamily: '"Julius Sans One", sans-serif' }}>
                                    {user.avatar}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                            <p className="text-sm text-gray-500 mb-4">{user.role}</p>

                            <div className="w-full border-t border-gray-100 my-4"></div>

                            <div className="w-full space-y-3 text-left">
                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                    <User size={16} className="text-gray-400" />
                                    <span>{user.username}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                    <Mail size={16} className="text-gray-400" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 text-sm">
                                    <Shield size={16} className="text-gray-400" />
                                    <span>{user.id}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account Status</h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Current Plan</span>
                                <span className="text-sm font-medium text-gray-900">Enterprise</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Status</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats & Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                                        <stat.icon size={20} className={stat.color} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
                                        <p className="text-xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Personal Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                                <Briefcase size={20} className="text-gray-400" />
                                Professional Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Department</label>
                                    <p className="text-gray-900 font-medium">{user.department}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Member Since</label>
                                    <p className="text-gray-900 font-medium">{user.joinDate}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Login</label>
                                    <p className="text-gray-900 font-medium">{user.lastLogin}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Role</label>
                                    <p className="text-gray-900 font-medium">{user.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                                <Activity size={20} className="text-gray-400" />
                                Recent Activity
                            </h3>
                            <div className="space-y-6">
                                {activities.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-4 group">
                                        <div className="mt-1">
                                            <activity.icon size={16} className={activity.color} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{activity.action}</p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
