import React from "react";
import dynamic from "next/dynamic";
import {
    Package,
    Tag,
    Layers,
    IndianRupee,
    List,
    FileText,
    Truck,
    CreditCard, IdCard
} from "lucide-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function ProductForm({
    activeTab,
    description,
    setDescription,
}) {

    return (
        <>
            {/* 🔹 BASIC */}
            {activeTab === "basic" && (
                <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Product Name" Icon={Package} name="name" />
                    <Input label="Slug" Icon={Tag} name="slug" />
                </div>
            )}

            {/* 🔹 CATEGORY */}
            {activeTab === "category" && (
                <div className="grid md:grid-cols-2 gap-4">
                    <SelectInput
                        label="Category"
                        Icon={Layers}
                        name="categoryId"
                        options={[]}
                    />
                    <SelectInput
                        label="Sub Category"
                        Icon={Layers}
                        name="subCategoryId"
                        options={[]}
                    />
                </div>
            )}

            {/* 🔹 PRICE */}
            {activeTab === "price" && (
                <div className="grid md:grid-cols-2 gap-4">
                    <Input
                        label="Price"
                        type="number"
                        Icon={IndianRupee}
                        name="price"
                    />

                    <SelectInput
                        label="Price Type"
                        Icon={List}
                        name="priceType"
                        options={[
                            { label: "Fixed", value: "fixed" },
                            { label: "Starting", value: "starting" },
                            { label: "On Request", value: "on_request" },
                        ]}
                    />

                    <Input
                        label="Minimum Order Quantity"
                        type="number"
                        Icon={Package}
                        name="minOrderQty"
                    />
                </div>
            )}

            {/* 🔹 DESCRIPTION */}
            {activeTab === "description" && (
                <div>
                    <label className="label mb-2">Description</label>

                    <JoditEditor
                        value={description}
                        onBlur={(val) => setDescription(val)}
                        config={{
                            height: 300,
                            placeholder: "Write product description...",
                        }}
                    />
                </div>
            )}

            {/* 🔹 SPECIFICATIONS */}
            {activeTab === "specifications" && (
                <div>
                    <div className="flex justify-between mb-3">
                        <p className="font-medium">Specifications</p>
                        <button className="text-sm text-blue-600">+ Add</button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                        <Input label="Key (Material)" Icon={Tag} />
                        <Input label="Value (Steel)" Icon={FileText} />
                    </div>
                </div>
            )}

            {/* 🔹 OTHER */}
            {activeTab === "other" && (
                <div className="grid md:grid-cols-2 gap-4">

                    <Input
                        label="Delivery Time"
                        Icon={Truck}
                        name="deliveryTime"
                    />

                    <Input
                        label="Payment Terms"
                        Icon={CreditCard}
                        name="paymentTerms"
                    />

                    <Input
                        label="Packaging Details"
                        Icon={Package}
                        name="packagingDetails"
                    />

                    <Input
                        label="Supply Ability"
                        Icon={Layers}
                        name="supplyAbility"
                    />

                    <Input
                        label="Meta Title"
                        Icon={Tag}
                        name="metaTitle"
                    />

                    <Input
                        label="Meta Description"
                        Icon={FileText}
                        name="metaDescription"
                    />
                </div>
            )}
        </>
    );
}

function Input({ label, Icon = IdCard, ...props }) {
    return (
        <div>
            <label className="label">{label}</label>
            <div className="relative">
                <Icon size={18} className="icon" />
                <input
                    className="input pl-8!"
                    placeholder={label}
                    {...props}
                />
            </div>
        </div>
    );
}

function SelectInput({ label, Icon = IdCard, options = [], ...props }) {
    return (
        <div>
            <label className="label">{label}</label>
            <div className="relative">
                <Icon size={18} className="icon" />
                <select className="input pl-8!" {...props}>
                    <option value="">Select {label}</option>
                    {options.map((opt, i) => (
                        <option key={i} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}