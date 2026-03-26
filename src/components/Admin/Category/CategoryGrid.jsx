import { Edit, Plus, Trash2 } from "lucide-react";
import React from "react";

export default function CategoryGrid({
  setForm,
  setAddModal,
  industries,
  handleEditIndustry,
  deleteIndustry,
  handleEditClick,
  handleDelete,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {industries.map((item) => (
        <div
          key={item._id}
          className="border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all bg-white hover:-translate-y-1"
        >
          {/* 🔹 Industry Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#074977]/10 p-2 rounded-lg">
                <img
                  src={item?.imageUrl}
                  alt="No image"
                  className="w-6 h-6"
                />
              </div>

              <h2 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h2>
            </div>

            <div className="flex items-center gap-1">
              {/* ➕ Add Main Category */}
              <button
                onClick={() => {
                  setForm({ industryId: item._id });
                  setAddModal(true);
                }}
                className="flex items-center justify-center w-7 h-7 rounded-full 
                bg-[#0a5183]/10 text-[#0a5183] hover:bg-[#094875] hover:text-white transition"
              >
                <Plus size={16} />
              </button>

              <button
                onClick={() => handleEditIndustry(item)}
                className="flex items-center justify-center w-7 h-7 rounded-full 
                bg-[#D01132]/10 text-[#D01132] hover:bg-[#D01132] hover:text-white transition"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() => deleteIndustry(item._id)}
                className="flex items-center justify-center w-7 h-7 rounded-full 
                bg-[#D01132]/10 text-red-600 hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* 🔹 Categories */}
          <div className="space-y-4">
            {item?.mainCategory?.map((cat) => (
              <div key={cat._id}>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-700">
                    {cat.name}
                  </p>

                  <div className="flex gap-1 items-center">
                    {/* ➕ Add Subcategory */}
                    <button
                      onClick={() => {
                        setForm({
                          industryId: item._id,
                          parentCategoryId: cat._id,
                        });
                        setAddModal(true);
                      }}
                      className="flex items-center justify-center w-7 h-7 rounded-full 
                      bg-[#D01132]/10 text-[#D01132] hover:bg-[#D01132] hover:text-white transition"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => handleEditClick(cat)}
                      className="flex items-center justify-center w-7 h-7 rounded-full 
                      bg-[#0a5183]/10 text-[#0a5183] hover:bg-[#094875] hover:text-white transition"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="flex items-center justify-center w-7 h-7 rounded-full 
                      bg-[#D01132]/10 text-red-600 hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* 🔹 Sub Categories */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {cat.subCategory?.map((sub) => (
                    <span
                      key={sub._id}
                      className="text-xs px-3 py-1 rounded-full bg-[#074977]/10 text-[#074977] 
                      hover:bg-[#D01132]/10 hover:text-[#D01132] transition cursor-pointer"
                      onClick={() => handleEditClick(sub)} // 🔥 click to edit
                    >
                      {sub.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}