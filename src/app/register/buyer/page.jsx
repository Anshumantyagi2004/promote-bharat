"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BuyerRegister() {
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
        role: "buyer",
      });

      // Save user in Redux
      dispatch(setUser(res.data.user));
      toast.success("Buyer Registered Successfully");
      router.push("/buyer/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#084a77]">
          Register as Buyer
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

          <button
            type="submit"
            className="w-full bg-[#0A5B93] text-white py-3 rounded-lg hover:bg-[#084a77]"
          >
            Register Buyer
          </button>
        </form>
      </div>
    </div>
  );
}