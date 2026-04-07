"use client";
import axios from 'axios';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Help() {
  const { user } = useSelector((state) => state.auth);
  const [helps, setHelps] = useState([]);

  const getAllRequest = async () => {
    try {
      const res = await axios.get("/api/help/admin");
      // console.log(res)
      setHelps(res?.data?.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!user) return;
    getAllRequest()
  }, [user])

  return (<div className="flex flex-col w-full px-6 py-4 gap-5">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white px-4 py-3 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">
        All Help Request
      </h1>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-64">
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

    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">User Name</th>
            <th className="p-3">User</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Issue</th>
            <th className="p-3">Description</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {helps.length > 0 ? (
            helps.map((item) => (
              <tr key={item._id} className="border-b border-gray-300 hover:bg-gray-50 text-sm">
                <td className="p-3">{item.userId.name}</td>
                <td className="p-3 capitalize">{item.userId.role}</td>
                <td className="p-3">{item.subject}</td>
                <td className="p-3">{item.issueType}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${item.status === "OPEN"
                      ? "bg-blue-100 text-[#0a5183]"
                      : item.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button className="bg-[#0a5183] hover:bg-[#054776] text-white px-3 p-1.5 text-sm font-semibold rounded-md">
                    Reply
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No help requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>)
}
