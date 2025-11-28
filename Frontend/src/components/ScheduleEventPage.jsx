import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, AlignLeft, CheckCircle } from 'lucide-react';

const ScheduleEventPage = ({ onBack }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            onBack();
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#f8f7f5] font-['Space_Grotesk'] text-[#1c140d] p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-[#e8dbce] text-[#9c7349] hover:text-[#1c140d] transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black leading-tight tracking-[-0.033em]">Schedule Event</h1>
                        <p className="text-[#9c7349] text-base font-normal">Create a new event or meeting in the timetable.</p>
                    </div>
                </div>

                {/* Success Overlay */}
                {showSuccess && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-scale-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-2xl font-black mb-2">Event Scheduled!</h2>
                            <p className="text-[#9c7349]">Redirecting to dashboard...</p>
                        </div>
                    </div>
                )}

                <div className="bg-white p-8 rounded-xl shadow-sm border border-[#e8dbce]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Event Name */}
                        <div>
                            <label className="block text-sm font-bold text-[#5c4a3d] mb-2">Event Name</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50 text-lg font-bold placeholder:font-normal"
                                placeholder="e.g., Faculty Meeting"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date */}
                            <div>
                                <label className="block text-sm font-bold text-[#5c4a3d] mb-2 flex items-center gap-2">
                                    <Calendar size={16} /> Date
                                </label>
                                <input
                                    required
                                    type="date"
                                    className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50"
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-sm font-bold text-[#5c4a3d] mb-2 flex items-center gap-2">
                                    <Clock size={16} /> Time
                                </label>
                                <input
                                    required
                                    type="time"
                                    className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-bold text-[#5c4a3d] mb-2">Duration</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50 bg-white">
                                    <option>30 Minutes</option>
                                    <option>1 Hour</option>
                                    <option>1.5 Hours</option>
                                    <option>2 Hours</option>
                                    <option>Half Day</option>
                                    <option>Full Day</option>
                                </select>
                            </div>

                            {/* Room */}
                            <div>
                                <label className="block text-sm font-bold text-[#5c4a3d] mb-2 flex items-center gap-2">
                                    <MapPin size={16} /> Room
                                </label>
                                <select className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50 bg-white">
                                    <option>Conference Room A</option>
                                    <option>Conference Room B</option>
                                    <option>Auditorium</option>
                                    <option>Lab 101</option>
                                    <option>Staff Room</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-[#5c4a3d] mb-2 flex items-center gap-2">
                                <AlignLeft size={16} /> Description
                            </label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50 resize-none"
                                placeholder="Add details about the event..."
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex items-center gap-4">
                            <button
                                type="button"
                                onClick={onBack}
                                className="flex-1 px-6 py-3 rounded-lg font-bold text-[#5c4a3d] hover:bg-[#e8dbce] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-[#f48c25] text-white rounded-lg font-bold hover:bg-[#d6761b] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                            >
                                Schedule Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ScheduleEventPage;
