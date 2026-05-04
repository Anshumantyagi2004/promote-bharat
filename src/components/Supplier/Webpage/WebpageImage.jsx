import { Plus } from 'lucide-react'
import React from 'react'

export default function WebpageImage({section}) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4 h-fit">
            <div className="w-full h-52 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                <img
                    src={""}
                    className="h-full w-full object-contain"
                />
                <label className="absolute bottom-1 right-1 rounded-full p-2 bg-[#0a5183] hover:bg-[#074977] text-white cursor-pointer">
                    <Plus size={20} />
                    <input type="file" className="hidden" onChange={""} />
                </label>
            </div>
        </div>
    )
}
