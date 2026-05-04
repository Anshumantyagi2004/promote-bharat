"use client"
import Input from '@/components/Inputs/FormInput'
import { Award, Briefcase, Heading1, Heading6, Package, Palette, Timer, Users, X } from 'lucide-react'
import React, { useState } from 'react'
import dynamic from "next/dynamic";
import SelectInput from '@/components/Inputs/SelectInput';
import toast from 'react-hot-toast';

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function WebpageForm({ section }) {
    const [color, setColor] = useState("#007bff");
    const [form, setForm] = useState({
        faqs: [],
    });

    const hexToRgba = (hex) => {
        let r = 0, g = 0, b = 0;

        if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }

        return `rgba(${r}, ${g}, ${b}, 1)`;
    };
    const rgbaColor = hexToRgba(color);

    return (
        <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="grid md:grid-cols-2 gap-4">
                    {section == "Hero Section" && <>
                        <div className="">
                            <label className="label">Color</label>
                            <div className="relative flex items-center gap-2">
                                <Palette size={18} className="icon left-14!" />

                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-10 h-10 rounded-lg cursor-pointer"
                                />

                                <input
                                    type="text"
                                    value={rgbaColor}
                                    readOnly
                                    className="input pl-8! flex-1"
                                />
                            </div>
                        </div>

                        <Input
                            label="Heading"
                            Icon={Heading1}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />

                        <Input
                            label="Sub Heading"
                            Icon={Heading6}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />
                    </>}

                    {section == "About Us" && <>
                        <SelectInput
                            label="Heading"
                            Icon={Heading1}
                            name="priceType"
                            // value={form.priceType}
                            // onChange={handleChange}
                            options={[
                                { label: "About us", value: "About us" },
                                { label: "Intro", value: "Intro" },
                                { label: "Know us", value: "Know us" },
                                { label: "Who we are", value: "Who we are" },
                            ]}
                        />

                        <Input
                            label="Sub Heading"
                            Icon={Heading6}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />

                        <div className='md:col-span-2'>
                            <label className="label mb-2">Description</label>

                            <JoditEditor
                                // value={form.description}
                                // onBlur={(val) =>
                                //     setForm((prev) => ({ ...prev, description: val }))
                                // }
                                config={{
                                    height: 300,
                                    placeholder: "Write About us description...",
                                }}
                            />
                        </div>
                    </>}

                    {section == "Work Details" && <>
                        <Input
                            label="Experience"
                            Icon={Timer}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />

                        <Input
                            label="Clients"
                            Icon={Users}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />

                        <Input
                            label="Projects"
                            Icon={Briefcase}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />

                        <Input
                            label="Awards"
                            Icon={Award}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />
                    </>}

                    {section == "CTA" && <>
                        <Input
                            label="Heading"
                            Icon={Heading1}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />

                        <Input
                            label="Sub Heading"
                            Icon={Heading6}
                            name="name"
                        // value={form.name}
                        // onChange={handleChange}
                        />
                    </>}

                    {section == "FAQ" && <div className='md:col-span-2'>
                        <FAQSection form={form} setForm={setForm} />
                    </div>}
                </div>

                <div className="flex justify-between items-center gap-3 mt-6">
                    <div className="items-center">
                        <span className='text-blue-600 hover:underline cursor-pointer'>
                            Need help?
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2 rounded-lg bg-[#D01132] text-white cursor-pointer">
                            Cancel
                        </button>
                        <button className="px-6 py-2 bg-[#0a5183] text-white rounded-lg cursor-pointer">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


function FAQSection({ form, setForm }) {

    const handleFAQChange = (index, field, value) => {
        const updated = [...form.faqs];
        updated[index][field] = value;

        setForm((prev) => ({
            ...prev,
            faqs: updated,
        }));
    };

    const addFAQ = () => {
        const last = form.faqs[form.faqs.length - 1];

        if (last && (!last.question || !last.answer)) {
            toast.error("Please fill current FAQ first");
            return;
        }

        setForm((prev) => ({
            ...prev,
            faqs: [
                ...prev.faqs,
                { question: "", answer: "" },
            ],
        }));
    };

    const removeFAQ = (index) => {
        const updated = form.faqs.filter((_, i) => i !== index);

        setForm((prev) => ({
            ...prev,
            faqs: updated,
        }));
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-gray-800 text-base">
                    FAQs
                </p>

                <button
                    onClick={addFAQ}
                    className="text-sm bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg transition"
                >
                    + Add
                </button>
            </div>

            {/* Empty State */}
            {form.faqs.length === 0 && (
                <div className="text-sm text-gray-400 mb-3">
                    No FAQs added
                </div>
            )}

            {/* FAQ List */}
            <div className="">
                {form.faqs.map((faq, index) => (
                    <div key={index} className="grid md:grid-cols-2 gap-5">

                        {/* Question */}
                        <div className="mb-2">
                            <Input
                                label="Question"
                                value={faq.question}
                                onChange={(e) =>
                                    handleFAQChange(index, "question", e.target.value)
                                }
                            />
                        </div>

                        {/* Answer */}
                        <div className="flex gap-2 items-start">
                            <div className="flex-1">
                                <Input
                                    label="Answer"
                                    value={faq.answer}
                                    onChange={(e) =>
                                        handleFAQChange(index, "answer", e.target.value)
                                    }
                                />
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => removeFAQ(index)}
                                className="mt-6 p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}