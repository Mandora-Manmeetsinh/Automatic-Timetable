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
        { label: "Timetables Created", value: "12", icon: Calendar, color: "text-[#f48c25]", bg: "bg-[#fff8f1]" },
        { label: "Data Uploaded", value: "45 Files", icon: FileText, color: "text-[#f48c25]", bg: "bg-[#fff8f1]" },
        { label: "Active Sessions", value: "24h", icon: Clock, color: "text-[#f48c25]", bg: "bg-[#fff8f1]" },
    ];

    // Mock Recent Activity
    const activities = [
        { action: "Generated Timetable for CS Batch A", time: "2 hours ago", icon: CheckCircle, color: "text-green-600" },
        { action: "Uploaded Faculty_List_2024.csv", time: "Yesterday, 4:30 PM", icon: FileText, color: "text-blue-600" },
        { action: "Updated System Settings", time: "Nov 22, 2024", icon: Activity, color: "text-purple-600" },
    ];

    return (
        <div className="flex-1 bg-[#f8f7f5] p-8 overflow-y-auto h-screen font-['Space_Grotesk'] text-[#1c140d]">
            {/* Google Fonts Link */}
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />

            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">
                            User Profile
                        </h1>
                        <p className="text-[#9c7349] mt-1 text-base font-normal">Manage your account settings and view activity.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#f48c25] text-white text-sm font-bold rounded-lg hover:bg-[#d6761b] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                        <Edit3 size={16} />
                        Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Identity Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-[#e8dbce] p-6 flex flex-col items-center text-center hover:border-[#f48c25] transition-colors group">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#f4ede7] to-[#e8dbce] flex items-center justify-center mb-4 border-4 border-white shadow-md">
                                <span className="text-4xl font-bold text-[#1c140d] tracking-widest">
                                    {user.avatar}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-[#1c140d]">{user.name}</h2>
                            <p className="text-sm text-[#9c7349] mb-4">{user.role}</p>

                            <div className="w-full border-t border-[#e8dbce] my-4"></div>

                            <div className="w-full space-y-3 text-left">
                                <div className="flex items-center gap-3 text-[#1c140d] text-sm">
                                    <User size={16} className="text-[#9c7349]" />
                                    <span>{user.username}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#1c140d] text-sm">
                                    <Mail size={16} className="text-[#9c7349]" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[#1c140d] text-sm">
                                    <Shield size={16} className="text-[#9c7349]" />
                                    <span>{user.id}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e8dbce] p-6 hover:border-[#f48c25] transition-colors">
                            <h3 className="text-xs font-bold text-[#9c7349] uppercase tracking-wider mb-4">Account Status</h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-[#1c140d]">Current Plan</span>
                                <span className="text-sm font-bold text-[#1c140d]">Enterprise</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#1c140d]">Status</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
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
                                <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-[#e8dbce] flex items-center gap-4 transition-all hover:-translate-y-1 duration-300 hover:border-[#f48c25] group">
                                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                                        <stat.icon size={20} className={stat.color} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#9c7349] uppercase tracking-wide font-bold group-hover:text-[#f48c25] transition-colors">{stat.label}</p>
                                        <p className="text-xl font-bold text-[#1c140d] mt-1">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Personal Information */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e8dbce] p-8 hover:border-[#f48c25] transition-colors">
                            <h3 className="text-lg font-bold text-[#1c140d] mb-6 flex items-center gap-2">
                                <Briefcase size={20} className="text-[#9c7349]" />
                                Professional Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <label className="block text-xs font-bold text-[#9c7349] uppercase tracking-wider mb-2">Department</label>
                                    <p className="text-[#1c140d] font-medium">{user.department}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#9c7349] uppercase tracking-wider mb-2">Member Since</label>
                                    <p className="text-[#1c140d] font-medium">{user.joinDate}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#9c7349] uppercase tracking-wider mb-2">Last Login</label>
                                    <p className="text-[#1c140d] font-medium">{user.lastLogin}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#9c7349] uppercase tracking-wider mb-2">Role</label>
                                    <p className="text-[#1c140d] font-medium">{user.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#e8dbce] p-8 hover:border-[#f48c25] transition-colors">
                            <h3 className="text-lg font-bold text-[#1c140d] mb-6 flex items-center gap-2">
                                <Activity size={20} className="text-[#9c7349]" />
                                Recent Activity
                            </h3>
                            <div className="space-y-6">
                                {activities.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-4 group">
                                        <div className="mt-1">
                                            <activity.icon size={16} className={activity.color} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-[#1c140d] group-hover:text-[#f48c25] transition-colors">{activity.action}</p>
                                            <p className="text-xs text-[#9c7349] mt-1">{activity.time}</p>
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
