"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
    Building2,
    User,
    MapPin,
    Calendar1,
    Building,
    IndianRupee,
    Users,
} from "lucide-react";

export default function BusinessForm({ user, setBusinessDetails }) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [form, setForm] = useState({
        companyName: "",
        ceoName: "",
        gstNumber: "",
        establishedDate: "",
        ownershipType: "",
        businessType: "",
        annualTurnover: "",
        numberOfEmployees: "",
        address: "",
    });

    const fetchBusiness = async () => {
        try {
            const res = await axios.get("/api/profile/business", {
                headers: { "x-user-id": user?._id, },
            });

            if (res.data?.data) {
                setForm({
                    ...res.data.data,
                    establishedDate: res.data.data.establishedDate
                        ? res.data.data.establishedDate.split("T")[0]
                        : "",
                });
                setBusinessDetails(res.data?.data)
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load data");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchBusiness();
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await axios.post("/api/profile/business", form, {
                headers: { "x-user-id": user?._id, },
            });

            toast.success("Business details saved");
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // if (fetching) {
    //     return <p className="text-center py-10">Loading...</p>;
    // }

    return (
        <div className="grid md:grid-cols-2 gap-4">
            <Input label="Company Name" icon={<Building2 size={18} />} name="companyName" value={form.companyName} onChange={handleChange} />

            <Input label="CEO Name" icon={<User size={18} />} name="ceoName" value={form.ceoName} onChange={handleChange} />

            <Input label="GST Number" icon={<Building2 size={18} />} name="gstNumber" value={form.gstNumber} onChange={handleChange} />

            <Input label="Established Date" type="date" icon={<Calendar1 size={18} />} name="establishedDate" value={form.establishedDate} onChange={handleChange} />

            <Input label="Ownership Type" icon={<User size={18} />} name="ownershipType" value={form.ownershipType} onChange={handleChange} />

            <Input label="Business Type" icon={<Building size={18} />} name="businessType" value={form.businessType} onChange={handleChange} />

            <Input label="Annual Turnover" icon={<IndianRupee size={17} />} name="annualTurnover" value={form.annualTurnover} onChange={handleChange} />

            <Input label="Number of Employees" icon={<Users size={18} />} name="numberOfEmployees" value={form.numberOfEmployees} onChange={handleChange} />

            <div>
                <label className="label">Business Address</label>
                <div className="relative">
                    <MapPin size={18} className="icon" />
                    <textarea
                        placeholder="Enter Business Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="input !pl-8"
                    />
                </div>
            </div>

            <div className="flex items-center md:mt-5 justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 rounded-md text-white bg-[#0a5183] hover:bg-[#074977] disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

/* Input Component */
function Input({ label, icon, type = "text", ...props }) {
    return (
        <div>
            <label className="label">{label}</label>
            <div className="relative">
                <div className="icon">{icon}</div>
                <input type={type} className="input !pl-8" {...props} placeholder={label} />
            </div>
        </div>
    );
}