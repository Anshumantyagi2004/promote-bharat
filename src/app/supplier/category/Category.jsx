"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search, Eye, Trash2, Edit } from "lucide-react";
import AddModal from "@/components/Supplier/Category/AddModal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import CategoryGrid from "@/components/Supplier/Category/CategoryGrid";

export default function Category() {
  const { user } = useSelector((state) => state.auth);
  const [addModal, setAddModal] = useState(false)
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    categoryName: "",
    metaTitle: "",
    metaDescription: "",
    categoryDescription: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleSave = async () => {
    try {
      const res = await axios.post("/api/category", {
        ...form,
        userId: user?._id,
      });

      if (res.status === 201) {
        toast.success("Saved");
        setAddModal(false)
        setForm()
        getAllCategories()
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/category", {
        headers: { "x-user-id": user?._id, },
      });
      const data = res.data.data;
      setCategories(data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    getAllCategories();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");

    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/category/${id}`);
      toast.success("Deleted");
      getAllCategories(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  const updateCategory = async (id, data) => {
    try {
      const res = await axios.put(`/api/category/${id}`, data);

      if (res.status === 200) {
        toast.success("Updated");
        getAllCategories(); // refresh
        setAddModal(false);
        setForm()
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (cat) => {
    setForm(cat);
    setAddModal(true);
  };

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
              className="input pl-8!"
            />
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <CategoryGrid
        categories={categories}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete} />

      <AddModal
        open={addModal}
        onClose={() => { setAddModal(false); setForm() }}
        handleChange={handleChange}
        form={form}
        handleSave={() =>
          form?._id
            ? updateCategory(form._id, form)
            : handleSave()
        }
      />
    </div>
  );
}