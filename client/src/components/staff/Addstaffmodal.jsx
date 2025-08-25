import { use, useState } from "react";
import { ADD_NEW_STAFF } from "../../apis/local.apis";
import toast from "react-hot-toast";
import { UserContext } from "../../contexts/all.context";

export default function StaffModal({ onClose }) {
  const [formData, setFormData] = useState({
    staffName: "",
    phone: "",
    staffEmail: "",
    hiredDate: "",
    shiffTime: "",
    staffProfession: "",
    staffSpecialist: "",
  });
  const { user } = use(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.keys(user).length == 0 ||
      user.userRole.toLowerCase() != "manager"
    ) {
      toast.error("you don't have permission to add staff", {
        position: "top-center",
        duration: 1500,
      });
      return;
    }
    if (
      !formData.staffName.trim() ||
      !formData.phone.trim() ||
      isNaN(formData.phone) ||
      !formData.staffEmail.trim() ||
      typeof formData.staffEmail !== "string" ||
      !formData.hiredDate.trim() ||
      !formData.shiffTime.trim() ||
      !formData.staffProfession.trim() ||
      typeof formData.staffProfession !== "string" ||
      !formData.staffSpecialist.trim() ||
      typeof formData.staffSpecialist !== "string"
    ) {
      toast.error("Enter all mandatory fields", {
        position: "top-center",
        duration: 1500,
      });
      return;
    }
    await fetch(ADD_NEW_STAFF, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    toast.success("new staff added", {
      position: "top-center",
      duration: 1500,
    });
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white bg-opacity-95 backdrop-blur-md p-8 rounded-2xl max-w-2xl w-full max-h-[85vh] shadow-2xl overflow-y-auto relative border border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 font-medium transition-colors"
        >
          Close
        </button>

        <h2 className="text-2xl font-bold mb-8 text-gray-900">
          Add Staff Member
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="staffName"
                placeholder="Enter full name"
                value={formData.staffName}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Phone *
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="staffEmail"
                placeholder="Enter email address"
                value={formData.staffEmail}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Hire Date *
              </label>
              <input
                type="date"
                name="hiredDate"
                value={formData.hiredDate}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Profession *
              </label>
              <input
                type="text"
                name="staffProfession"
                value={formData.staffProfession}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Shift *
              </label>
              <select
                name="shiffTime"
                value={formData.shiffTime}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
              >
                <option value="">Select Shift</option>
                <option value="morning shift">Morning Shift</option>
                <option value="afternoon shift">Afternoon Shift</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Specialization *
              </label>
              <select
                name="staffSpecialist"
                value={formData.staffSpecialist}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
              >
                <option value="">Select Specialization</option>
                <option value="Large mammals">Large mammals</option>
                <option value="Carnivores">Carnivores</option>
                <option value="Avian care">Avian care</option>
                <option value="Zoo operations">Zoo operations</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Save Staff Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
