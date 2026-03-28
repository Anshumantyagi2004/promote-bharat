import React from "react";

export default function ProductGrid({ products = [], loading = true }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white p-4 rounded-lg shadow">
            {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white p-2 rounded-xl shadow animate-pulse border border-gray-300">
                        <div className="h-40 bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}

            {!loading &&
                products.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                    >
                        <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">
                            Image
                        </div>

                        <h3 className="font-semibold text-gray-800">
                            {item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                            ₹ {item.price || "Get Best Price"}
                        </p>
                    </div>
                ))}
        </div>
    );
}