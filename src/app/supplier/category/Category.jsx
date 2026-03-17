"use client";
import React, { useState } from "react";
import { Plus, Search, Eye, Trash2, Edit } from "lucide-react";
import AddModal from "@/components/Supplier/Category/AddModal";

export default function Category() {
  const [addModal, setAddModal] = useState(false)
  const categories = [
    {
      id: 1,
      name: "Electronics",
      items: 120,
      image: "https://source.unsplash.com/400x300/?electronics",
    },
    {
      id: 2,
      name: "Clothing",
      items: 80,
      image: "https://source.unsplash.com/400x300/?clothing",
    },
    {
      id: 3,
      name: "Books",
      items: 45,
      image: "https://source.unsplash.com/400x300/?books",
    },
    {
      id: 4,
      name: "Furniture",
      items: 32,
      image: "https://source.unsplash.com/400x300/?furniture",
    },
  ];

  return (
    <div className="p-4 md:p-6 w-full bg-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 bg-white px-4 py-3 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Categories
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button onClick={() => setAddModal(true)} className="flex items-center gap-2 bg-[#0a5183] text-white px-4 py-2 rounded-lg shadow hover:bg-[#074977] transition">
            <Plus size={18} />
            Add
          </button>

          <div className="relative w-full md:w-64">
            <Search
              size={18}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search..."
              className="input !pl-8"
            />
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group">
            <div className="h-40 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {cat.name}
              </h2>

              {/* Actions */}
              <div className="mt-2 flex justify-between items-center">
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-base">
                  <Edit size={17} />
                  Edit
                </button>

                <button className="flex items-center gap-1 text-red-500 hover:text-red-600 text-base">
                  <Trash2 size={17} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddModal
        open={addModal}
        onClose={() => setAddModal(false)}
      />
    </div>
  );
}