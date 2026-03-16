"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Lock, Smartphone } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [otpMode, setOtpMode] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
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
        if (otpMode) return toast.success("Only Login with Password Working");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!data.success) {
                toast.error(data.message);
                return;
            }

            dispatch(setUser(data.user));
            toast.success("Login Successful");
            router.push(`/${data.user.role}/dashboard`);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
                    Sign In
                </h2>

                {/* Toggle Login Type */}
                <div className="flex mb-6 border rounded-lg overflow-hidden">
                    <button onClick={() => setOtpMode(false)}
                        className={`w-1/2 py-2 text-sm ${!otpMode ? "bg-blue-600 text-white" : "bg-gray-100 text-black"}`}>
                        Password Login
                    </button>

                    <button onClick={() => setOtpMode(true)}
                        className={`w-1/2 py-2 text-sm ${otpMode ? "bg-blue-600 text-white" : "bg-gray-100 text-black"}`}>
                        OTP Login
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4 text-black placeholder-gray-800">
                    <div className="relative">
                        <Mail className="absolute left-3 top-4 text-gray-800" size={18} />
                        <input
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            className="w-full border pl-10 p-3 rounded-lg"
                            required
                        />
                    </div>

                    {/* Password or Phone */}
                    {!otpMode ? (
                        <div className="relative">
                            <Lock className="absolute left-3 top-4 text-gray-800" size={18} />
                            <input
                                name="password"
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                                className="w-full border pl-10 p-3 rounded-lg"
                                required
                            />
                        </div>
                    ) : (
                        <div className="relative">
                            <Smartphone
                                className="absolute left-3 top-4 text-gray-800"
                                size={18}
                            />
                            <input
                                placeholder="Enter Phone Number"
                                className="w-full border pl-10 p-3 rounded-lg"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        {otpMode ? "Send OTP" : "Sign In"}
                    </button>

                    <div className="text-center">
                        <a
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}