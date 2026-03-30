import Modal from '@/components/Modal/Modal'
import React from 'react'
import { MessageCircle, } from "lucide-react";
import toast from 'react-hot-toast';

export default function NeedHelpModal({ open, onClose, }) {
    const handleSave = () => {
        toast.success("Under development");
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Header title="Send Message" />
            <Modal.Body>
                <div>
                    <label className="label">Message</label>
                    <div className="relative">
                        <MessageCircle size={18} className="icon" />
                        <textarea cols={6} rows={6} className="input pl-8!" placeholder="Enter your Message" />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='flex justify-end gap-2'>
                    <button onClick={handleSave} className="px-4 py-2 rounded-md text-white bg-[#0a5183] hover:bg-[#074977]">
                        Save
                    </button>
                    <button onClick={onClose} className="border border-gray-300 px-4 py-2 rounded-md text-black bg-gray-100 hover:bg-gray-200">
                        Close
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
