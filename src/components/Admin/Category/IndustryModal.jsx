import Modal from "@/components/Modal/Modal";
import React from "react";
import {
  FolderTree,
  SearchCode,
  ChartBarDecreasing, Upload, ImagePlus
} from "lucide-react";
import Input from "@/components/Inputs/FormInput";

export default function AddIndustryModal({
  open,
  onClose,
  handleSave,
  handleChange,
  form,
  handleImageChange
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header
        title={form?._id ? "Edit Industry" : "Add Industry"}
      />

      <Modal.Body>
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            {/* Image Preview */}
            <div className="relative group">
              <img
                src={form?.imageUrl}
                className="w-24 h-24 rounded-xl object-cover border border-gray-300 shadow-sm"
                alt="preview"
              />

              {/* Overlay */}
              <label className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                <ImagePlus className="text-white w-6 h-6" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Upload Button */}
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Industry Name"
              name="name"
              value={form?.name}
              icon={<FolderTree size={18} />}
              onChange={handleChange}
              placeholder="Enter Industry Name"
            />

            <Input
              label="Meta Title"
              name="metaTitle"
              value={form?.metaTitle}
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
                  value={form?.metaDescription}
                  onChange={handleChange}
                  className="input pl-8!"
                  placeholder="Enter Meta Description"
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