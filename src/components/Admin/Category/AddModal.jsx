import Modal from "@/components/Modal/Modal";
import React from "react";
import {
  FolderTree,
  SearchCode,
  ChartBarDecreasing,
  ImagePlus,
  Upload,
  Building,
} from "lucide-react";
import Input from "@/components/Inputs/FormInput";
import SelectInput from "@/components/Inputs/SelectInput";

export default function AddCategoryModal({
  open,
  onClose,
  handleSave,
  handleChange,
  form,
  industries = [],
  categories = [],
  handleImageChange
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header title={form?._id ? "Edit Category" : "Add Category"} />

      <Modal.Body>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="relative group">
              <img
                src={form?.imageUrl}
                className="w-20 h-20 rounded-lg object-cover border border-gray-300"
                alt="preview"
              />

              {/* Hover Overlay */}
              <label className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                <ImagePlus className="text-white w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <label className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition">
              <Upload className="w-4 h-4" />
              <span className="text-xs font-medium">Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              label="Category Name"
              name="name"
              value={form?.name || ""}
              icon={<FolderTree size={18} />}
              onChange={handleChange}
              placeholder="Enter Category Name"
            />

            <SelectInput
              label="Select Industry"
              Icon={Building}
              name="industryId"
              value={form?.industryId}
              onChange={handleChange}
              options={industries.map((c) => ({
                label: c?.name,
                value: c?._id,
              }))}
            />

            <SelectInput
              label="Parent Category"
              name="parentCategoryId"
              value={form?.parentCategoryId}
              onChange={handleChange}
              options={categories.map((c) => ({
                label: c?.name,
                value: c?._id,
              }))}
            />

            <Input
              label="Meta Title"
              name="metaTitle"
              value={form?.metaTitle || ""}
              icon={<SearchCode size={18} />}
              onChange={handleChange}
              placeholder="Enter Meta Title"
            />

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