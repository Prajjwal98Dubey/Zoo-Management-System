import { AiOutlineClose } from "react-icons/ai";

export default function StaffModal({ details, onClose }) {
  if (!details) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 w-full max-w-2xl"
        style={{
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold text-2xl">{details.staff_name}</div>
          <button>
            <AiOutlineClose
              className="text-gray-600 hover:text-gray-800 transition"
              size={24}
              onClick={onClose}
            />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-x-12 gap-y-4 mb-4 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent auto-rows-min py-6">
          <div>
            <div className="text-sm text-gray-500 font-medium">Role</div>
            <div className="text-base font-normal rounded-lg bg-blue-50 text-blue-700 px-3 py-1 w-fit border border-blue-100">
              {details.staff_profession}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Department</div>
            <div className="text-base font-normal rounded-lg bg-green-50 text-green-700 px-3 py-1 w-fit border border-green-100">
              {details.department}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Specialization
            </div>
            <div className="text-base font-normal rounded-lg bg-purple-50 text-purple-700 px-3 py-1 w-fit border border-purple-100">
              {details.staff_specialist}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Phone</div>
            <div className="text-base font-normal">{details.phone}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Email</div>
            <div className="text-base font-normal">{details.staff_email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Hire Date</div>
            <div className="text-base font-normal">{details.hired_date}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Shift</div>
            <div className="text-base font-normal">{details.shiff_time}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Address</div>
            <div className="text-base font-normal">
              {details.address || "depression"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
