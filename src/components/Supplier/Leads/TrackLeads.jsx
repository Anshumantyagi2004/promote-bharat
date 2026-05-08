import React, { useEffect, useState } from "react";
import {
    Phone,
    MessageCircle,
    Eye,
    FileText,
    MousePointerClick,
    User,
    Mail,
    Clock,
    Smartphone,
    Globe,
    Activity,
    Loader2,
} from "lucide-react";

import { motion } from "framer-motion";
import axios from "axios";

export default function TrackLeads({ user }) {
    const [trackingData, setTrackingData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Event Icons
    const getEventIcon = (type) => {
        switch (type) {
            case "whatsapp_click":
                return <MessageCircle size={20} className="text-green-500" />;

            case "call_click":
                return <Phone size={20} className="text-blue-500" />;

            case "product_view":
                return <Eye size={20} className="text-purple-500" />;

            case "inquiry_submit":
                return <FileText size={20} className="text-orange-500" />;

            case "inquiry_open":
                return <MousePointerClick size={20} className="text-pink-500" />;

            default:
                return <Activity size={20} className="text-gray-500" />;
        }
    };

    // Event Labels
    const getEventLabel = (type) => {
        switch (type) {
            case "whatsapp_click":
                return "clicked WhatsApp";

            case "call_click":
                return "clicked Call";

            case "product_view":
                return "viewed Product";

            case "inquiry_submit":
                return "submitted Inquiry";

            case "inquiry_open":
                return "opened Inquiry";

            default:
                return type;
        }
    };

    // Detect Device
    const getDevice = (userAgent = "") => {
        if (/android/i.test(userAgent)) return "Android Mobile";
        if (/iphone|ipad|ipod/i.test(userAgent)) return "iPhone";
        if (/windows/i.test(userAgent)) return "Windows PC";
        if (/mac/i.test(userAgent)) return "MacBook";
        return "Unknown Device";
    };

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/tracking/events/supplier/${user?._id}`
                );

                if (response.data.success) {
                    setTrackingData(response.data.data || []);
                }
            } catch (error) {
                console.error("Error fetching leads:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchLeads();
        }
    }, [user]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Lead Tracking
                    </h2>
                </div>

                <div className="bg-linear-to-r  from-blue-500 to-indigo-500 text-white px-5 py-3 rounded-2xl shadow-lg">
                    <p className="text-sm opacity-90">Total Activities</p>

                    <h3 className="text-2xl font-bold">
                        {trackingData.length}
                    </h3>
                </div>
            </div>

            {loading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
            )}

            {!loading && trackingData.length === 0 && (
                <div className="bg-white rounded-3xl border border-gray-300 shadow-sm p-16 text-center">
                    <Activity size={50} className="mx-auto text-gray-300 mb-4" />

                    <h3 className="text-xl font-semibold text-gray-700">
                        No Activities Found
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Buyer tracking activity will appear here
                    </p>
                </div>
            )}

            {/* Cards */}
            {!loading && trackingData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {trackingData.map((item, index) => (
                        <motion.div key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="p-5 border-b border-b-gray-300 bg-linear-to-r from-gray-50 to-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                                            {getEventIcon(item.eventType)}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-800 capitalize">
                                                {item?.buyerInfo?.name || "Unknown Buyer"}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {getEventLabel(item.eventType)}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                                        {item.source || "dir"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 space-y-4">
                                <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-100">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        <span className="font-semibold text-gray-900">
                                            {item?.buyerInfo?.name || "A Buyer"}
                                        </span>{" "}
                                        interacted with your listing by{" "}
                                        <span className="font-medium text-blue-600">
                                            {getEventLabel(item.eventType)}
                                        </span>{" "}
                                        using{" "}
                                        <span className="font-medium text-green-600">
                                            {getDevice(item.userAgent)}
                                        </span>
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {item?.buyerInfo?.email && (
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Mail size={16} className="text-gray-400" />
                                            {item.buyerInfo.email}
                                        </div>
                                    )}

                                    {item?.buyerInfo?.phone && (
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Phone size={16} className="text-gray-400" />
                                            {item.buyerInfo.phone}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Smartphone size={16} className="text-gray-400" />
                                        {getDevice(item.userAgent)}
                                    </div>

                                    {item?.ipAddress && (
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Globe size={16} className="text-gray-400" />
                                            {item.ipAddress}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="px-5 py-4 border-t border-t-gray-300 bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock size={15} />
                                    {new Date(item.createdAt).toLocaleString()}
                                </div>

                                <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                                    {item.productId || "N/A"}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}