"use client";

import React, { useState } from "react";
import {
    ArrowLeft,
    Lock,
    LogOut,
    Trash2,
    Bell,
    Globe,
    User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ChangePassword from "./ChangePassword";
import SignOut from "./SignOut";

export default function Layout({ layout, setLayout, user }) {
    const router = useRouter();

    const renderContent = () => {
        switch (layout) {
            // CHANGE PASSWORD
            case "change-password":
                return (
                    <ChangePassword setLayout={setLayout} user={user} />
                );

            // SIGN OUT
            case "signout":
                return (
                    <SignOut setLayout={setLayout} user={user} />
                );

            // DISABLE ACCOUNT
            case "disable-account":
                return (
                    <div className="space-y-5">
                        <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
                            <Trash2 size={22} />
                            Disable Account
                        </h2>

                        <p className="text-gray-500">
                            Once disabled, your account will no longer be accessible.
                        </p>

                        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl">
                            Disable Account
                        </button>
                    </div>
                );

            // NOTIFICATIONS
            case "notifications":
                return (
                    <div className="space-y-5">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Bell size={22} />
                            Notifications
                        </h2>

                        <div className="flex items-center justify-between border p-4 rounded-xl">
                            <div>
                                <h3 className="font-semibold">Email Notifications</h3>
                                <p className="text-sm text-gray-500">
                                    Receive updates through email
                                </p>
                            </div>

                            <input type="checkbox" className="w-5 h-5" />
                        </div>

                        <div className="flex items-center justify-between border p-4 rounded-xl">
                            <div>
                                <h3 className="font-semibold">Push Notifications</h3>
                                <p className="text-sm text-gray-500">
                                    Receive push notifications
                                </p>
                            </div>

                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                    </div>
                );

            // LANGUAGE
            case "language":
                return (
                    <div className="space-y-5">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Globe size={22} />
                            Language Settings
                        </h2>

                        <select className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500">
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Gujarati</option>
                        </select>

                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl">
                            Save Language
                        </button>
                    </div>
                );

            // PROFILE SETTINGS
            case "profile-settings":
                router.push("/supplier/profile");
                return null;

            default: return <div>No Layout Found</div>;
        }
    };

    return (
        <div className="">
            {renderContent()}
        </div>
    );
}