import Modal from '@/components/Modal/Modal'
import React from 'react'
import {
    FolderTree,
    SearchCode,
    ChartBarDecreasing,
} from "lucide-react";

export default function AddModal({ open, onClose, handleEdit, user, handleChange, form, getInitial }) {
    return (<>
        <Modal open={open} onClose={onClose}>
            <Modal.Header title="Edit Profile Here" />
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

                        <Input
                            label="Meta Description"
                            name="metaDescription"
                            value={form?.metaDescription}
                            icon={<ChartBarDecreasing size={18} />}
                            onChange={handleChange}
                            placeholder="Enter Meta Description"
                        />

                        <Input
                            label="Category Description"
                            name="categoryDescription"
                            value={form?.categoryDescription}
                            icon={<ChartBarDecreasing size={18} />}
                            onChange={handleChange}
                            placeholder="Enter Description"
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='flex justify-end gap-2'>
                    <button onClick={handleEdit} className="px-4 py-2 rounded-md text-white bg-[#0a5183] hover:bg-[#074977]">
                        Save
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
                    className="input !pl-8"
                    {...props}
                />
            </div>
        </div>
    );
}
