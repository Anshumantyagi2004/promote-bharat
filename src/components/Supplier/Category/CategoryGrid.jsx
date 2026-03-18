import { Edit, Trash2 } from 'lucide-react'
import React from 'react'

export default function CategoryGrid({ categories, handleEditClick, handleDelete }) {
    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group">
                <div className="h-40 overflow-hidden">
                    <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                </div>

                {/* Content */}
                <div className="px-4 py-2">
                    <h2 className="text-lg font-semibold text-center text-gray-800">
                        {cat.categoryName}
                    </h2>

                    <p className="text-sm text-gray-600 line-clamp-2">
                        {cat.categoryDescription}
                    </p>

                    {/* Actions */}
                    <div className="mt-2 flex justify-between items-center">
                        <button
                            onClick={() => handleEditClick(cat)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition text-sm"
                        >
                            <Edit size={16} /> Edit
                        </button>

                        <button
                            onClick={() => handleDelete(cat._id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-100 text-red-500 hover:bg-red-200 transition text-sm"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>)
}
