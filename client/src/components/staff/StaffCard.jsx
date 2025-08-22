import { FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

function StaffCard({ staff }) {
  return (
    <div className="w-full max-w-sm rounded-xl bg-white border border-gray-200 shadow-sm shadow-gray-300 p-5 flex flex-col gap-3">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{staff.name}</h2>
          <p className="text-sm text-gray-600">{staff.department}</p>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-md font-medium ${
            staff.role === "veterinarian"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {staff.role}
        </span>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaPhone className="text-gray-400" />
          <span>{staff.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-gray-400" />
          <span>{staff.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" />
          <span>Hired: {staff.hireDate}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {staff.shift && (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
            {staff.shift}
          </span>
        )}
        {staff.specialization && (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-medium">
            {staff.specialization}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-3">
        <button className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          View Details
        </button>
        <button className="flex-1 rounded-lg py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700">
          Edit
        </button>
      </div>
    </div>
  );
}

export default StaffCard;
