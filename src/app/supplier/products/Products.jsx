"use client"
import ProductForm from '@/components/Supplier/Product/ProductForm';
import ProductGrid from '@/components/Supplier/Product/ProductGrid';
import { ArrowLeft, Plus, Search } from 'lucide-react'
import { useRef, useState } from "react";

export default function Products() {
  const [isAddActive, setAddActive] = useState(false)
  const [activeTab, setActiveTab] = useState("basic");
  const [description, setDescription] = useState("");
  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "category", label: "Category" },
    { id: "price", label: "Price" },
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "other", label: "Other" },
  ];

  return (<div className="p-4 md:p-6 w-full bg-gray-100">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 bg-white px-4 py-3 rounded-xl shadow-sm">
      <div className='flex items-center gap-3'>
        <h1 className="text-2xl font-bold text-gray-800">
          Products
        </h1>
        <button onClick={() => setAddActive(!isAddActive)} className="flex items-center gap-2 bg-[#0a5183] text-white px-4 py-2 rounded-lg shadow hover:bg-[#074977] transition">
          {isAddActive ?
            <>
              <ArrowLeft size={18} />
              Back
            </>
            :
            <>
              <Plus size={18} />
              Add
            </>}
        </button>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <select name="" className='input py-2.5! text-gray-600'>
          <option value="">Select Category</option>
          <option value="">Ball Pens</option>
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

    {isAddActive ? (
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-xl shadow space-y-4 h-fit relative">
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-col items-center gap-3 relative">

              {/* Preview */}
              <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>

              {/* Upload */}
              <label className="absolute bottom-1 right-0 rounded-full p-2 bg-[#0a5183] hover:bg-[#074977] text-white cursor-pointer">
                <Plus size={16} />
                <input type="file" multiple className="hidden" />
              </label>
            </div>

            <h2 className="text-lg font-semibold mt-3">
              Product Images
            </h2>
            <p className="text-sm text-gray-500">
              Upload product media
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-100 h-16 rounded"></div>
            <div className="bg-gray-100 h-16 rounded"></div>
            <div className="bg-gray-100 h-16 rounded"></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow p-2 flex flex-wrap gap-1.5">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${activeTab === tab.id ? "bg-[#D01132] text-white" : "hover:bg-[#fbe9ec] text-[#D01132] border border-[#D01132]"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <ProductForm
              activeTab={activeTab}
              description={description}
              setDescription={setDescription}
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setAddActive(false)}
                className="px-5 py-2 rounded-lg bg-[#D01132] text-white"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#0a5183] text-white rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <ProductGrid />
    )}

  </div>)
}