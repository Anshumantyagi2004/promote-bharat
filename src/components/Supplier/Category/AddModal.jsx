import Modal from '@/components/Modal/Modal'
import React from 'react'
import {
    FolderTree,
    SearchCode,
    ChartBarDecreasing,
} from "lucide-react";

export default function AddModal({ open, onClose, handleSave, handleChange, form }) {
    return (<>
        <Modal open={open} onClose={onClose}>
            <Modal.Header title={form?._id ? "Edit Category Here" : "Add Category Here"} />
            <Modal.Body>
                <div className="space-y-4">
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src={form?.profileImage}
                            className="w-20 h-20 rounded-full object-cover border"
                            alt=""
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Category Name"
                            name="categoryName"
                            value={form?.categoryName}
                            icon={<FolderTree size={18} />}
                            onChange={handleChange}
                            placeholder="Enter Category Name"
                        />

                        <Input
                            label="Meta Title"
                            name="metaTitle"
                            value={form?.metaTitle}
                            icon={<SearchCode size={18} />}
                            onChange={handleChange}
                            placeholder="Enter Meta Title"
                        />

                        <div className='md:col-span-2'>
                            <label className="label">Meta Description</label>
                            <div className="relative">
                                <div className="icon"><ChartBarDecreasing size={18} /></div>
                                <textarea
                                    name="metaDescription"
                                    value={form?.metaDescription}
                                    onChange={handleChange}
                                    className="input pl-8!"
                                    placeholder="Enter Meta Description"
                                />
                            </div>
                        </div>

                        <div className='md:col-span-2'>
                            <label className="label">Category Description</label>
                            <div className="relative">
                                <div className="icon"><ChartBarDecreasing size={18} /></div>
                                <textarea
                                    name="categoryDescription"
                                    value={form?.categoryDescription}
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
                <div className='flex justify-end gap-2'>
                    <button onClick={handleSave} className="px-4 py-2 rounded-md text-white bg-[#0a5183] hover:bg-[#074977]">
                        {form?._id ? "Edit" : "Save"}
                    </button>
                    <button onClick={onClose} className="border border-gray-300 px-4 py-2 rounded-md text-black bg-gray-100 hover:bg-gray-200">
                        Close
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    </>)
}

function Input({ label, icon, ...props }) {
    return (
        <div>
            <label className="label">{label}</label>
            <div className="relative">
                <div className="icon">{icon}</div>
                <input
                    className="input pl-8!"
                    {...props}
                />
            </div>
        </div>
    );
}
