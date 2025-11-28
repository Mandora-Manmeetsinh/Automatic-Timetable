import React from 'react';
import { User, FileText, Calendar, Settings, HelpCircle, LogOut, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentPage, onPageChange }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
          fixed top-0 left-0 h-screen w-64 bg-[#f8f7f5] border-r border-[#f4ede7] flex flex-col justify-between z-50 transition-transform duration-300 font-['Space_Grotesk']
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
            >
                {/* Top Section */}
                <div className="p-4 flex flex-col gap-6">
                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:hidden text-[#9c7349] hover:text-[#1c140d]"
                    >
                        <X size={24} />
                    </button>

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 px-2">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-10 shadow-sm border border-[#e8dbce]"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiv_Fxmj7F-dknqe0e8cTUUlcUBc1t5BHp0bNy1Ke1ptEVAjQHlntROAh4g0scOM6Izh2Ilb4zH9Wyn1ycIQaeNcGN5EbM7Iayip4SWQDOV3cHj2lXrOmZVv8YLbR8FGMtg8BcwELXdAhOeakv9YLfxbfpxn1lrZIUS9a32ZE6S8Ua6J17IDQgytM2IpyP6ZmDPOoKDMBNMO_hVH203X6YYK0NRq_HeAQmFXRPKB0n_0aSu8kzL3GssuY8knN2D3GwRWN9Q8Ywbik")' }}
                        ></div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <h1 className="text-[#1c140d] text-base font-bold leading-normal">Automatic Timetable</h1>
                                {/* <span className="bg-[#f48c25] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">Pro</span> */}
                            </div>
                            <p className="text-[#9c7349] text-xs font-normal leading-normal">Generator</p>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex flex-col gap-1">
                        <button
                            onClick={() => onPageChange('profile')}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
                ${currentPage === 'profile' ? 'bg-[#f4ede7] text-[#1c140d] font-bold shadow-sm' : 'text-[#5c4a3d] hover:bg-[#f4ede7]/50 hover:text-[#1c140d]'}`}
                        >
                            <User size={20} className={currentPage === 'profile' ? 'text-[#f48c25]' : 'text-[#9c7349] group-hover:text-[#f48c25] transition-colors'} />
                            <p className="text-sm leading-normal">Profile</p>
                        </button>

                        <button
                            onClick={() => onPageChange('upload')}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
                ${currentPage === 'upload' ? 'bg-[#f4ede7] text-[#1c140d] font-bold shadow-sm' : 'text-[#5c4a3d] hover:bg-[#f4ede7]/50 hover:text-[#1c140d]'}`}
                        >
                            <FileText size={20} className={currentPage === 'upload' ? 'text-[#f48c25]' : 'text-[#9c7349] group-hover:text-[#f48c25] transition-colors'} />
                            <p className="text-sm leading-normal">Uploaded Docs</p>
                        </button>

                        <button
                            onClick={() => onPageChange('timetable-output')}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group
                ${currentPage === 'timetable-output' ? 'bg-[#f4ede7] text-[#1c140d] font-bold shadow-sm' : 'text-[#5c4a3d] hover:bg-[#f4ede7]/50 hover:text-[#1c140d]'}`}
                        >
                            <Calendar size={20} className={currentPage === 'timetable-output' ? 'text-[#f48c25]' : 'text-[#9c7349] group-hover:text-[#f48c25] transition-colors'} />
                            <p className="text-sm leading-normal">Timetables</p>
                        </button>
                    </nav>

                    <div className="px-3 py-2">
                        <div className="text-xs font-bold text-[#9c7349] uppercase tracking-wider mb-2">Tools</div>
                        <button className="flex items-center justify-between gap-3 px-3 py-2 text-[#5c4a3d] hover:bg-[#f4ede7]/50 hover:text-[#1c140d] rounded-lg transition-colors group w-full">
                            <div className="flex items-center gap-3">
                                <Settings size={18} className="text-[#9c7349] group-hover:text-[#f48c25]" />
                                <p className="text-sm font-medium leading-normal">Settings</p>
                            </div>
                        </button>
                        <button className="flex items-center justify-between gap-3 px-3 py-2 text-[#5c4a3d] hover:bg-[#f4ede7]/50 hover:text-[#1c140d] rounded-lg transition-colors group w-full">
                            <div className="flex items-center gap-3">
                                <HelpCircle size={18} className="text-[#9c7349] group-hover:text-[#f48c25]" />
                                <p className="text-sm font-medium leading-normal">Support</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="p-4 border-t border-[#e8dbce] bg-[#f4ede7]/30">
                    <button
                        onClick={() => onPageChange('upload')}
                        className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#f48c25] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d6761b] transition-colors shadow-md hover:shadow-lg mb-4"
                    >
                        Start Generating
                    </button>

                    <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#f4ede7] transition-colors cursor-pointer group">
                        <div className="size-9 rounded-full bg-[#1c140d] text-white flex items-center justify-center text-sm font-bold">
                            MS
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#1c140d] truncate">Manmeet sinh</p>
                            <p className="text-xs text-[#9c7349] truncate">manmeet@uni.edu</p>
                        </div>
                        <LogOut size={16} className="text-[#9c7349] group-hover:text-[#f48c25]" />
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
