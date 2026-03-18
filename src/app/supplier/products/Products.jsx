import { Plus, Search } from 'lucide-react'
import React from 'react'

export default function Products() {
  return (<div className="p-4 md:p-6 w-full bg-gray-100">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 bg-white px-4 py-3 rounded-xl shadow-sm">
      <div className='flex items-center gap-3'>
        <h1 className="text-2xl font-bold text-gray-800">
          Products
        </h1>
        <button className="flex items-center gap-2 bg-[#0a5183] text-white px-4 py-2 rounded-lg shadow hover:bg-[#074977] transition">
          <Plus size={18} />
          Add
        </button>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <select name="" className='input py-2.5! text-gray-600'>
          <option value="">Select Category</option>
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


  </div>)
}
