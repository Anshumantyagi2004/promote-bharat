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

const leads = [
  {
    platform: "https://barbendingmachineimporter.com",
    platformEmail: "leads@site.com",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@gmail.com",
    place: "Delhi",
    priceRange: "5-10cr",
    message: "Looking for property investment",
    product: "Apartment",
  },
];

export default function LeadList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {leads.map((lead, i) => (
        <motion.div key={i}
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

              {/* Call Button */}
              <button
                onClick={() => window.open(`tel:${lead.phone}`)}
                className="p-2 rounded-full bg-[#D01132]/10 hover:bg-[#D01132]/20 transition"
              >
                <Phone size={18} className="text-[#D01132]" />
              </button>
            </div>

            {/* Platform (clickable) */}
            <a
              href={lead.platform}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs px-2 py-1 mb-3 w-fit rounded bg-[#074977]/10 text-[#074977] hover:underline"
            >
              <Globe size={14} />
              {lead.platform.replace("https://", "")}
            </a>

            {/* Details */}
            <div className="space-y-2 grid grid-cols-2 text-sm text-gray-700">

              <p className="flex items-center gap-2">
                <Phone size={16} className="text-[#D01132]" />
                {lead.phone}
              </p>

              <p className="flex items-center gap-2">
                <Mail size={16} className="text-[#074977]" />
                {lead.email}
              </p>

              <p className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                {lead.platformEmail}
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

            {/* Message */}
            <div className="mt-2 p-3 rounded-lg bg-gray-50 border">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
                <MessageSquare size={16} className="text-[#074977]" />
                Message
              </p>
              <p className="text-sm text-gray-600">{lead.message}</p>
            </div>

          </div>
        </motion.div>
      ))}
    </div>
  );
}