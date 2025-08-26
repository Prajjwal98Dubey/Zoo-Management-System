import { FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import StaffModal from "./StaffModal";
import { useState } from "react";
import { createPortal } from "react-dom";
import { formatDate } from "../../helpers/staff.helpers";
function StaffCard({ staff }) {
  // role → class mapping
  const roleStyles = {
    veterinarian: "bg-red-100 text-red-600",
    zookeeper: "bg-blue-100 text-blue-600",
    caretaker: "bg-yellow-100 text-yellow-700",
    admin: "bg-purple-100 text-purple-600",
  };

  // default style if role not found
  const roleClass =
    roleStyles[staff.staff_profession] || "bg-gray-100 text-gray-600";

  const [modalopen, setmodalopen] = useState(false);
  return (
    <div className="w-full max-w-sm rounded-xl bg-white border border-gray-200 shadow-sm shadow-gray-300 p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {staff.staff_name}
          </h2>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-md font-medium ${roleClass}`}
        >
          {staff.staff_profession}
        </span>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaPhone className="text-gray-400" />
          <span>{staff.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-gray-400" />
          <span>{staff.staff_email}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" />
          <span>Hired: {formatDate(staff.hired_date)}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {staff.shiff_time && (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
            {staff.shiff_time}
          </span>
        )}
        {staff.staff_specialist && (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-medium">
            {staff.staff_specialist}
          </span>
        )}
      </div>
      <div className="flex gap-3 mt-3">
        <button
          className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => {
            setmodalopen(true);
          }}
        >
          <MdOutlineRemoveRedEye className="inline-block mr-1" />
          View Details
        </button>

        {modalopen &&
          createPortal(
            <StaffModal details={staff} onClose={() => setmodalopen(false)} />,
            document.body
          )}
      </div>
    </div>
  );
}

export default StaffCard;
