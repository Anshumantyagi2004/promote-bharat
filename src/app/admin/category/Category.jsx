"use client";
import React, { useEffect, useState } from "react";
import {
  Plus, Search,
  Book,
  Pill,
  Hospital,
  Utensils,
  Factory,
  Wrench,
  Building2,
  Cpu,
  Package,
  FlaskConical,
  Cog,
  Microscope,
  PlusCircle,
  Edit
} from "lucide-react";
import AddModal from "@/components/Admin/Category/AddModal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import CategoryGrid from "@/components/Admin/Category/CategoryGrid";
import AddIndustryModal from "@/components/Admin/Category/IndustryModal";

export default function Category() {
  const { user } = useSelector((state) => state.auth);
  const [addModal, setAddModal] = useState(false)
  const [addModalIndustry, setAddModalIndustry] = useState(false)
  const [categories, setCategories] = useState([]);
  const [industries, setIndustries] = useState([]);

  const [form, setForm] = useState({
    categoryName: "",
    metaTitle: "",
    metaDescription: "",
    categoryDescription: "",
    imageUrl: "",
    imageKey: "",
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
      const formData = new FormData();
      formData.append("name", form?.name || "");
      formData.append("metaTitle", form?.metaTitle || "");
      formData.append("metaDescription", form?.metaDescription || "");
      formData.append("categoryDescription", form?.categoryDescription || "");
      formData.append("industryId", form?.industryId || "");
      formData.append("parentCategoryId", form?.parentCategoryId || "");
      if (imageFile) {
        formData.append("file", imageFile);
      }

      const res = await axios.post("/api/category", formData);
      if (res.status === 201) {
        toast.success("Saved");
        setAddModal(false)
        setForm()
        getIndustries()
        getAllCategories()
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      const data = res.data.data;
      setCategories(data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getIndustries()
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
      getIndustries(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  const updateCategory = async (id, data) => {
    try {
      const formData = new FormData();
      formData.append("name", data?.name || "");
      formData.append("metaTitle", data?.metaTitle || "");
      formData.append("metaDescription", data?.metaDescription || "");
      formData.append("categoryDescription", data?.categoryDescription || "");
      formData.append("industryId", data?.industryId || "");
      formData.append("parentCategoryId", data?.parentCategoryId || "");
      if (imageFile) {
        formData.append("file", imageFile);
      }

      const res = await axios.put(`/api/category/${id}`, formData);
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

  const [industryForm, setIndustryForm] = useState({
    name: "",
    metaTitle: "",
    metaDescription: "",
    imageUrl: "",
    imageKey: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const preview = URL.createObjectURL(file);

    setIndustryForm((prev) => ({
      ...prev,
      imageUrl: preview,
    }));

    setImageFile(file);
  };

  const handleImageChangeCategory = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const preview = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      imageUrl: preview,
    }));

    setImageFile(file);
  };

  const handleChangeIndustry = (e) => {
    const { name, value } = e.target;

    setIndustryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getIndustries = async () => {
    try {
      const res = await axios.get("/api/industry");
      setIndustries(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const createIndustry = async (data) => {
    if (!data?.name) return toast.error("Name is mandatory");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("metaTitle", data.metaTitle);
      formData.append("metaDescription", data.metaDescription);
      if (imageFile) {
        formData.append("file", imageFile);
      }
      const res = await axios.post("/api/industry", formData);
      setIndustryForm({
        name: "",
        metaTitle: "",
        metaDescription: "",
        imageUrl: "",
      });
      getIndustries()
      setAddModalIndustry(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const updateIndustry = async (id, data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("metaTitle", data.metaTitle);
      formData.append("metaDescription", data.metaDescription);
      if (imageFile) {
        formData.append("file", imageFile);
      }
      const res = await axios.put(`/api/industry/${id}`, formData);

      setIndustryForm({
        name: "",
        metaTitle: "",
        metaDescription: "",
        imageUrl: "",
      });
      getIndustries()
      setAddModalIndustry(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deleteIndustry = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this industry?");
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`/api/industry/${id}`);

      console.log("Deleted:", res.data);

      getIndustries(); // refresh list
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleEditIndustry = (cat) => {
    setIndustryForm(cat);
    setAddModalIndustry(true);
  };
  // console.log(industries)
  return (
    <div className="p-4 md:p-6 w-full bg-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 bg-white px-4 py-3 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Categories
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button onClick={() => setAddModalIndustry(true)} className="flex items-center gap-2 bg-[#0a5183] text-white px-4 py-2 rounded-lg shadow hover:bg-[#074977] transition">
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
        industries={industries}
        handleEditIndustry={handleEditIndustry}
        deleteIndustry={deleteIndustry}
        handleDelete={handleDelete}
        handleEditClick={handleEditClick}
        setAddModal={setAddModal}
        setForm={setForm}
      />

      <AddModal
        open={addModal}
        handleImageChange={handleImageChangeCategory}
        onClose={() => { setAddModal(false); setForm() }}
        handleChange={handleChange}
        form={form}
        handleSave={() =>
          form?._id
            ? updateCategory(form._id, form)
            : handleSave()
        }
        industries={industries}
        categories={categories}
      />

      <AddIndustryModal
        open={addModalIndustry}
        onClose={() => {
          setAddModalIndustry(false);
          setIndustryForm({});
        }}
        handleImageChange={handleImageChange}
        form={industryForm}
        handleChange={handleChangeIndustry}
        handleSave={() =>
          industryForm?._id
            ? updateIndustry(industryForm._id, industryForm)
            : createIndustry(industryForm)
        }
      />
    </div>
  );
}