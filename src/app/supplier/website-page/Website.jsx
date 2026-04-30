import React from 'react'
import {
    Home,
    Info,
    Briefcase,
    Rocket,
    HelpCircle,
    Mail,
} from "lucide-react";

const sectionItems = [
    { name: "Hero Section", icon: Home, color: "bg-blue-100 text-blue-600" },
    { name: "About Us", icon: Info, color: "bg-green-100 text-green-600" },
    { name: "Work Details", icon: Briefcase, color: "bg-yellow-100 text-yellow-600" },
    { name: "CTA", icon: Rocket, color: "bg-purple-100 text-purple-600" },
    { name: "FAQ", icon: HelpCircle, color: "bg-pink-100 text-pink-600" },
    { name: "Contact Form", icon: Mail, color: "bg-indigo-100 text-indigo-600" },
];

export default function Website() {
    return (<>
        <div className="py-10 px-4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {sectionItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="h-46 flex flex-col items-center justify-center p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white hover:scale-105"
                        >
                            <div className={`p-4 rounded-full mb-3 ${item.color}`}>
                                <Icon size={28} />
                            </div>
                            <p className="text-sm font-semibold text-gray-700 text-center">
                                {item.name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>

    </>)
}
