import React, { useState } from 'react';
import { ArrowLeft, Shield, Key, Smartphone, Activity, CheckCircle } from 'lucide-react';

const SecurityPage = ({ onBack }) => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#f8f7f5] font-['Space_Grotesk'] text-[#1c140d] p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-[#e8dbce] text-[#9c7349] hover:text-[#1c140d] transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black leading-tight tracking-[-0.033em]">Security Settings</h1>
                        <p className="text-[#9c7349] text-base font-normal">Manage your account security and preferences.</p>
                    </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 animate-fade-in">
                        <CheckCircle size={20} />
                        <span className="font-bold">Settings saved successfully!</span>
                    </div>
                )}

                <div className="flex flex-col gap-6">
                    {/* Password Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e8dbce]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#f4ede7] rounded-lg text-[#f48c25]">
                                <Key size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Password</h2>
                                <p className="text-[#9c7349] text-sm">Update your password to keep your account secure.</p>
                            </div>
                        </div>

                        <div className="space-y-4 max-w-md">
                            <div>
                                <label className="block text-sm font-bold text-[#5c4a3d] mb-1">Current Password</label>
                                <input type="password" className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#5c4a3d] mb-1">New Password</label>
                                <input type="password" className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#5c4a3d] mb-1">Confirm New Password</label>
                                <input type="password" className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50" placeholder="••••••••" />
                            </div>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-[#1c140d] text-white rounded-lg font-bold hover:bg-[#3a2d25] transition-colors"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>

                    {/* 2FA Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e8dbce]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#f4ede7] rounded-lg text-[#f48c25]">
                                    <Smartphone size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Two-Factor Authentication</h2>
                                    <p className="text-[#9c7349] text-sm">Add an extra layer of security to your account.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-[#f48c25]' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Login Activity */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e8dbce]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#f4ede7] rounded-lg text-[#f48c25]">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Recent Login Activity</h2>
                                <p className="text-[#9c7349] text-sm">Monitor where you're logged in.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#f8f7f5] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="font-bold text-[#1c140d]">Windows PC - Chrome</p>
                                        <p className="text-xs text-[#9c7349]">Mumbai, India • Active now</p>
                                    </div>
                                </div>
                                <button className="text-sm font-bold text-[#f48c25] hover:underline">Details</button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-[#f8f7f5] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <div>
                                        <p className="font-bold text-[#1c140d]">iPhone 13 - Safari</p>
                                        <p className="text-xs text-[#9c7349]">Mumbai, India • 2 hours ago</p>
                                    </div>
                                </div>
                                <button className="text-sm font-bold text-[#f48c25] hover:underline">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;
