"use client"
import LeadList from '@/components/Supplier/Leads/CardGrid';
import FilterSidebar from '@/components/Supplier/Leads/FilterSidebar';
import TrackLeads from '@/components/Supplier/Leads/TrackLeads';
import { Filter, Search, X } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function Leads() {
    const [open, setOpen] = useState(false);
    const [switchButton, setSwitchButton] = useState(false);
    const { user } = useSelector((state) => state.auth);

    return (
        <div className='p-4 bg-gray-100 w-full'>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 bg-white px-4 py-3 rounded-xl shadow-sm">
                <div className='flex items-center gap-2'>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Leads
                    </h1>
                    <div onClick={() => setOpen(!open)}
                        className="px-2 py-2 border border-gray-400 rounded-lg cursor-pointer bg-white text-gray-800"
                    >
                        <span className="flex items-center gap-2">
                            <Filter size={18} />
                        </span>
                    </div>
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl w-fit shadow-sm">
                        {/* Inquiry Leads */}
                        <button
                            onClick={() => setSwitchButton(false)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${!switchButton
                                ? "bg-white shadow text-blue-600"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            Inquiry Leads
                        </button>

                        {/* Track Clicks */}
                        <button
                            onClick={() => setSwitchButton(true)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${switchButton
                                ? "bg-white shadow text-green-600"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            Track Clicks
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select name="" className='input py-2.5! text-gray-600'>
                        <option value="">Today</option>
                        <option value="">All</option>
                        <option value="">Recent</option>
                        <option value="">Relevant</option>
                        <option value="">Newest</option>
                    </select>
                    <div className="relative w-full">
                        <Search
                            size={18}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input pl-8!"
                        />
                    </div>
                </div>
            </div>

            {switchButton ? <TrackLeads user={user} /> : <LeadList user={user} />}

            <FilterSidebar open={open} setOpen={setOpen} />
        </div>
    )
}
