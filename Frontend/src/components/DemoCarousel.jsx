import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Upload, Users, Layers, Calendar, FileOutput } from 'lucide-react';

const DemoCarousel = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Step 1: Upload Data",
            description: "Start by uploading your course and teacher data using Excel or CSV files. Our system parses this information to understand your scheduling requirements.",
            icon: <Upload size={48} className="text-blue-500" />,
            color: "bg-blue-50"
        },
        {
            title: "Step 2: Teacher Assignment",
            description: "Assign teachers to specific courses. You can manage multiple assignments and ensure every subject has a qualified instructor.",
            icon: <Users size={48} className="text-purple-500" />,
            color: "bg-purple-50"
        },
        {
            title: "Step 3: Batch Management",
            description: "Organize students into batches. Define practical groups and theory sections to optimize resource usage.",
            icon: <Layers size={48} className="text-orange-500" />,
            color: "bg-orange-50"
        },
        {
            title: "Step 4: Generate Timetable",
            description: "Our AI engine processes all constraints and preferences to generate a conflict-free timetable in seconds.",
            icon: <Calendar size={48} className="text-green-500" />,
            color: "bg-green-50"
        },
        {
            title: "Step 5: View & Export",
            description: "Review the generated timetable, make manual adjustments if needed, and export to PDF or Excel for distribution.",
            icon: <FileOutput size={48} className="text-teal-500" />,
            color: "bg-teal-50"
        }
    ];

    const nextStep = () => {
        setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X size={24} className="text-gray-500" />
                </button>

                <div className="flex flex-col h-full">
                    {/* Content Area */}
                    <div className={`flex-1 p-12 flex flex-col items-center justify-center text-center transition-colors duration-300 ${steps[currentStep].color}`}>
                        <div className="mb-6 p-4 bg-white rounded-full shadow-sm">
                            {steps[currentStep].icon}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{steps[currentStep].title}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                            {steps[currentStep].description}
                        </p>
                    </div>

                    {/* Navigation Area */}
                    <div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between">
                        <button
                            onClick={prevStep}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                            <ChevronLeft size={20} />
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentStep ? 'bg-[#f48c25] w-8' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-4 py-2 bg-[#f48c25] text-white rounded-lg hover:bg-[#d6761b] transition-colors font-medium shadow-sm hover:shadow"
                        >
                            {currentStep === steps.length - 1 ? 'Start Over' : 'Next'}
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoCarousel;
