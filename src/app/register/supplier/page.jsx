"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SellerRegister() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        ...form,
        role: "supplier",
      });

      // Save user in Redux
      dispatch(setUser(res.data.user));
      toast.success("Supplier Registered Successfully");
      router.push("/supplier/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#b90e2b]">
          Register as Supplier
        </h2>

        <form onSubmit={onSubmit} className="space-y-4 text-black placeholder-gray-800">
          <input
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="company"
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            type="email"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="phone"
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            name="password"
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full border p-3 rounded-lg"
            required
          />

          <button className="w-full bg-[#D01132] text-white py-3 rounded-lg hover:bg-[#b90e2b]" type="submit">
            Register Supplier
          </button>
        </form>
      </div>
    </div>
  );
}