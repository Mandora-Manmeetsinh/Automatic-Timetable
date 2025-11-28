import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, HelpCircle, Mail, ChevronDown, ChevronUp, Send } from 'lucide-react';

const SupportPage = ({ onBack }) => {
    const [openFaq, setOpenFaq] = useState(null);
    const [messageSent, setMessageSent] = useState(false);

    const faqs = [
        {
            question: "How do I generate a new timetable?",
            answer: "Navigate to the Dashboard and click on 'New Timetable' or 'Start Generating'. Follow the steps to upload your data, assign teachers, and manage batches."
        },
        {
            question: "Can I export the timetable to PDF?",
            answer: "Yes! Once a timetable is generated, you can view it in the 'Timetables' section and click the 'Export PDF' button."
        },
        {
            question: "How does the auto-assign feature work?",
            answer: "Our smart algorithm considers teacher preferences, designations (HOD/Professor), and workload limits to automatically assign the best fit for each subject."
        },
        {
            question: "What if I find a conflict in the schedule?",
            answer: "The system automatically checks for conflicts during generation. If you manually edit the schedule, you'll see warning indicators for any overlaps."
        }
    ];

    const handleSendMessage = (e) => {
        e.preventDefault();
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#f8f7f5] font-['Space_Grotesk'] text-[#1c140d] p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-[#e8dbce] text-[#9c7349] hover:text-[#1c140d] transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black leading-tight tracking-[-0.033em]">Help & Support</h1>
                        <p className="text-[#9c7349] text-base font-normal">We're here to help you get the most out of the Timetable Generator.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* FAQ Section */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <HelpCircle className="text-[#f48c25]" size={24} />
                            Frequently Asked Questions
                        </h2>
                        <div className="flex flex-col gap-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm border border-[#e8dbce] overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f8f7f5] transition-colors"
                                    >
                                        <span className="font-bold text-[#1c140d]">{faq.question}</span>
                                        {openFaq === index ? <ChevronUp size={20} className="text-[#9c7349]" /> : <ChevronDown size={20} className="text-[#9c7349]" />}
                                    </button>
                                    {openFaq === index && (
                                        <div className="p-4 pt-0 text-[#5c4a3d] text-sm leading-relaxed border-t border-[#f4ede7] bg-[#f8f7f5]/50">
                                            <div className="pt-4">{faq.answer}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#f4ede7] p-6 rounded-xl mt-4">
                            <h3 className="font-bold text-lg mb-2">Still need help?</h3>
                            <p className="text-[#9c7349] text-sm mb-4">Our support team is available Mon-Fri, 9am - 6pm.</p>
                            <div className="flex items-center gap-2 text-[#1c140d] font-bold">
                                <Mail size={18} />
                                <span>support@timetable-gen.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e8dbce] h-fit">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                            <MessageCircle className="text-[#f48c25]" size={24} />
                            Contact Us
                        </h2>

                        {messageSent ? (
                            <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-[#f8f7f5] rounded-xl border border-green-200">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                                <p className="text-green-700">We'll get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSendMessage} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-[#5c4a3d] mb-1">Name</label>
                                    <input required type="text" className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#5c4a3d] mb-1">Email</label>
                                    <input required type="email" className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#5c4a3d] mb-1">Subject</label>
                                    <select className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50 bg-white">
                                        <option>General Inquiry</option>
                                        <option>Technical Issue</option>
                                        <option>Feature Request</option>
                                        <option>Billing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#5c4a3d] mb-1">Message</label>
                                    <textarea required rows="4" className="w-full px-4 py-2 rounded-lg border border-[#e8dbce] focus:outline-none focus:ring-2 focus:ring-[#f48c25]/50 resize-none" placeholder="How can we help you?"></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#f48c25] text-white rounded-lg font-bold hover:bg-[#d6761b] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                                >
                                    <span>Send Message</span>
                                    <Send size={18} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
