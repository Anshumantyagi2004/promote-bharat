import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  MessageSquare,
  Building2,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadList({ user }) {
  const [leadsData, setLeadsData] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_LEAD_BACKEND_BASE_URL}/api/form/get-forms/${user?._id}`);
        if (response.data.success) {
          setLeadsData(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {leadsData?.length > 0 ? (
        leadsData.map((lead, index) => (
          <motion.div key={index}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-xl p-2"
          >
            <div className="bg-white rounded-xl p-4 h-full flex flex-col shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-[#074977]" />
                  <h3 className="font-semibold text-lg text-gray-800">
                    {lead.name}
                  </h3>
                </div>

                <button
                  onClick={() => window.open(`tel:${lead.phone}`)}
                  className="p-2 rounded-full bg-[#D01132]/10 hover:bg-[#D01132]/20 transition"
                >
                  <Phone size={18} className="text-[#D01132]" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs px-2 py-1 mb-3 w-fit rounded bg-[#074977]/10 text-[#074977] hover:underline">
                <Globe size={14} />
                {lead.platform.replace("https://", "")}
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                 <p className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  {lead.platformEmail}
                </p>

                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-[#D01132]" />
                  {lead.phone}
                </p>

                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-[#074977]" />
                  {lead.email}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#D01132]" />
                  {lead.place}
                </p>

                {lead.priceRange && (
                  <p className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-[#074977]" />
                    {lead.priceRange}
                  </p>
                )}

                {lead.product && (
                  <p className="flex items-center gap-2">
                    <Building2 size={16} className="text-[#D01132]" />
                    {lead.product}
                  </p>
                )}
              </div>

              <div className="mt-2 p-2 rounded-lg bg-gray-50 border border-gray-300">
                <p className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
                  <MessageSquare size={16} className="text-[#074977]" />
                  Message
                </p>
                <p className="text-sm text-gray-600">{lead.message}</p>
              </div>
            </div>
          </motion.div>))
      ) : (
        <p className="text-2xl font-bold text-gray-800 text-center">No leads found</p>
      )}
    </div>
  );
}