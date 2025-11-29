import React from 'react';
import { Search, ArrowRight, Clock, FileText, Share2, AlertCircle } from 'lucide-react';

const Dashboard = ({ onGetStarted, appState, onReset, onNavigate, onViewDemo }) => {
    return (
        <div className="flex-1 p-8 bg-[#f8f7f5] min-h-screen font-['Space_Grotesk'] text-[#1c140d]">
            {/* Google Fonts Link */}
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />

            <div className="mx-auto max-w-5xl">
                <header className="flex flex-wrap justify-between items-start gap-3 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">Welcome back, Manmeet!</h1>
                        <p className="text-[#9c7349] text-base font-normal leading-normal">Ready to organize your schedule?</p>
                    </div>
                </header>

                {/* Search Bar */}
                <div className="mb-8">
                    <label className="flex flex-col min-w-40 h-12 w-full">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm">
                            <div className="text-[#9c7349] flex border-none bg-white items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <Search size={20} />
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#1c140d] focus:outline-0 focus:ring-2 focus:ring-[#f48c25]/50 border-none bg-white h-full placeholder:text-[#9c7349] px-4 pl-2 text-base font-normal leading-normal"
                                placeholder="Search timetables by name, course, or tag..."
                            />
                        </div>
                    </label>
                </div>

                {/* Hero Card */}
                <div className="bg-[#f4ede7] p-8 rounded-xl mb-8 flex items-center justify-between relative overflow-hidden">
                    <div className="max-w-xl z-10">
                        <h2 className="text-3xl font-black leading-tight tracking-[-0.033em]">Intelligent Scheduling For Modern Needs.</h2>
                        <p className="text-[#9c7349] text-base font-normal leading-normal mt-3 max-w-md">
                            Automate your academic timetabling with our AI-driven engine. Optimize resource utilization, eliminate conflicts, and streamline operations.
                        </p>

                        {/* Quick Stats from previous theme */}
                        <div className="grid grid-cols-3 gap-6 border-t border-[#e8dbce] pt-6 mt-6 mb-6">
                            <div>
                                <p className="text-2xl font-bold text-[#1c140d]">98%</p>
                                <p className="text-xs text-[#9c7349] mt-1 uppercase tracking-wide font-bold">Conflict Free</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#1c140d]">15m</p>
                                <p className="text-xs text-[#9c7349] mt-1 uppercase tracking-wide font-bold">Setup Time</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-[#1c140d]">24/7</p>
                                <p className="text-xs text-[#9c7349] mt-1 uppercase tracking-wide font-bold">Availability</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={onGetStarted}
                                className="flex items-center justify-center rounded-lg h-10 px-6 bg-[#f48c25] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d6761b] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                            >
                                <span>Start Generating</span>
                                <ArrowRight size={16} className="ml-2" />
                            </button>
                            <button
                                onClick={onViewDemo}
                                className="flex items-center justify-center rounded-lg h-10 px-6 bg-white/50 text-[#1c140d] text-sm font-bold leading-normal hover:bg-white transition-colors border border-[#e8dbce]"
                            >
                                <span>View Demo</span>
                            </button>
                        </div>
                    </div>
                    {/* Abstract Background Decoration */}
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
                    <div className="hidden md:block w-64 h-64 bg-gray-200 rounded-lg shadow-inner bg-cover bg-center transform rotate-3 hover:rotate-0 transition-transform duration-500" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop")' }}></div>
                </div>

                {/* Quick Actions Row */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <button onClick={onGetStarted} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e8dbce] rounded-lg shadow-sm hover:border-[#f48c25] hover:text-[#f48c25] transition-colors whitespace-nowrap">
                        <FileText size={16} />
                        <span className="text-sm font-bold">New Timetable</span>
                    </button>
                    <button onClick={() => onNavigate('upload')} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e8dbce] rounded-lg shadow-sm hover:border-[#f48c25] hover:text-[#f48c25] transition-colors whitespace-nowrap">
                        <Share2 size={16} />
                        <span className="text-sm font-bold">Import Data</span>
                    </button>
                    <button onClick={() => onNavigate('schedule-event')} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e8dbce] rounded-lg shadow-sm hover:border-[#f48c25] hover:text-[#f48c25] transition-colors whitespace-nowrap">
                        <Clock size={16} />
                        <span className="text-sm font-bold">Schedule Event</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e8dbce] flex flex-col items-start justify-center hover:border-[#f48c25] transition-colors group">
                        <p className="text-[#9c7349] text-sm font-normal leading-normal group-hover:text-[#f48c25] transition-colors">Total Timetables</p>
                        <p className="text-[#1c140d] text-3xl font-bold leading-tight mt-1">12</p>
                    </div>

                    {/* Resource Utilization Card */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e8dbce] flex flex-col justify-center hover:border-[#f48c25] transition-colors group col-span-1 sm:col-span-2 lg:col-span-2">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <p className="text-[#9c7349] text-sm font-normal leading-normal group-hover:text-[#f48c25] transition-colors">Resource Utilization</p>
                                <p className="text-[#1c140d] text-3xl font-bold leading-tight mt-1">85%</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Optimal</span>
                        </div>
                        <div className="w-full bg-[#f4ede7] rounded-full h-2 overflow-hidden">
                            <div className="bg-[#f48c25] h-2 rounded-full w-[85%]"></div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e8dbce] flex flex-col items-start justify-center hover:border-[#f48c25] transition-colors group">
                        <p className="text-[#9c7349] text-sm font-normal leading-normal group-hover:text-[#f48c25] transition-colors">System Status</p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <p className="text-[#1c140d] text-xl font-bold leading-tight">Online</p>
                        </div>
                    </div>
                </div>

                {/* Recent Timetables */}
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-[#1c140d] text-[22px] font-bold leading-tight tracking-[-0.015em]">Your Recent Timetables</h2>
                    <button onClick={onViewDemo} className="text-[#f48c25] text-sm font-bold hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1 */}
                    <div className="flex flex-col gap-3 group cursor-pointer" onClick={onViewDemo}>
                        <div className="w-full aspect-video rounded-xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-amber-500"></div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-bold shadow-lg">View</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#1c140d] text-base font-bold leading-normal group-hover:text-[#f48c25] transition-colors">Fall 2024 Semester</p>
                            <p className="text-[#9c7349] text-xs font-normal leading-normal mt-1">Last modified: 2 days ago</p>
                            <span className="inline-block bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider mt-2 px-2 py-1 rounded-full">Finalized</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex flex-col gap-3 group cursor-pointer" onClick={onViewDemo}>
                        <div className="w-full aspect-video rounded-xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-300 to-indigo-500"></div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-bold shadow-lg">View</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#1c140d] text-base font-bold leading-normal group-hover:text-[#f48c25] transition-colors">Fall AI 2024</p>
                            <p className="text-[#9c7349] text-xs font-normal leading-normal mt-1">Last modified: 5 days ago</p>
                            <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase tracking-wider mt-2 px-2 py-1 rounded-full">Draft</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="flex flex-col gap-3 group cursor-pointer" onClick={onViewDemo}>
                        <div className="w-full aspect-video rounded-xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-500"></div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-bold shadow-lg">View</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#1c140d] text-base font-bold leading-normal group-hover:text-[#f48c25] transition-colors">Fall Cyber 2024 Semester</p>
                            <p className="text-[#9c7349] text-xs font-normal leading-normal mt-1">Last modified: 1 week ago</p>
                            <span className="inline-block bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider mt-2 px-2 py-1 rounded-full">Finalized</span>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="flex flex-col gap-3 group cursor-pointer" onClick={onViewDemo}>
                        <div className="w-full aspect-video rounded-xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-300 to-blue-500"></div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button className="text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-bold shadow-lg">View</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-[#1c140d] text-base font-bold leading-normal group-hover:text-[#f48c25] transition-colors">Fall Big data 2024 Semester</p>
                            <p className="text-[#9c7349] text-xs font-normal leading-normal mt-1">Last modified: 1 month ago</p>
                            <span className="inline-block bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider mt-2 px-2 py-1 rounded-full">Finalized</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
