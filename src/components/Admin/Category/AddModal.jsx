import Modal from "@/components/Modal/Modal";
import React from "react";
import {
  FolderTree,
  SearchCode,
  ChartBarDecreasing,
} from "lucide-react";

export default function AddCategoryModal({
  open,
  onClose,
  handleSave,
  handleChange,
  form,
  industries = [],
  categories = [],
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header
        title={form?._id ? "Edit Category" : "Add Category"}
      />

      <Modal.Body>
        <div className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Category Name */}
            <Input
              label="Category Name"
              name="name"
              value={form?.name || ""}
              icon={<FolderTree size={18} />}
              onChange={handleChange}
              placeholder="Enter Category Name"
            />

            {/* Industry */}
            <div>
              <label className="label">Select Industry</label>
              <select
                name="industryId"
                value={form?.industryId || ""}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Industry</option>
                {industries.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Parent Category */}
            <div>
              <label className="label">Parent Category</label>
              <select
                name="parentCategoryId"
                value={form?.parentCategoryId || ""}
                onChange={handleChange}
                className="input"
              >
                <option value="">None (Main Category)</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Meta Title */}
            <Input
              label="Meta Title"
              name="metaTitle"
              value={form?.metaTitle || ""}
              icon={<SearchCode size={18} />}
              onChange={handleChange}
              placeholder="Enter Meta Title"
            />

            {/* Meta Description */}
            <div className="md:col-span-2">
              <label className="label">Meta Description</label>
              <div className="relative">
                <div className="icon">
                  <ChartBarDecreasing size={18} />
                </div>
                <textarea
                  name="metaDescription"
                  value={form?.metaDescription || ""}
                  onChange={handleChange}
                  className="input pl-8!"
                  placeholder="Enter Meta Description"
                />
              </div>
            </div>

            {/* Category Description */}
            <div className="md:col-span-2">
              <label className="label">Category Description</label>
              <div className="relative">
                <div className="icon">
                  <ChartBarDecreasing size={18} />
                </div>
                <textarea
                  name="categoryDescription"
                  value={form?.categoryDescription || ""}
                  onChange={handleChange}
                  className="input pl-8!"
                  placeholder="Enter Category Description"
                />
              </div>
            </div>

          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md text-white bg-[#0a5183] hover:bg-[#074977]"
          >
            {form?._id ? "Update" : "Save"}
          </button>

          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

// ✅ Reusable Input
function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <div className="icon">{icon}</div>
        <input className="input pl-8!" {...props} />
      </div>
    </div>
  );
}