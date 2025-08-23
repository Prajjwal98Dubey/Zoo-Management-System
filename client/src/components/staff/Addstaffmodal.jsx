import { useState } from "react";

export default function StaffModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    phone: "",
    email: "",
    hireDate: "",
    shift: "",
    specialization: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    experience: "",
    certifications: "",
  });

  const [errors, setErrors] = useState({});

  const validDomains = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com',
    'icloud.com', 'protonmail.com', 'zoho.com', 'live.com', 'msn.com'
  ];

  const validateForm = () => {
    const newErrors = {};

    // Check all required fields
    Object.keys(formData).forEach(key => {
      if (!formData[key].toString().trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    // Phone number validation
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only numbers, spaces, +, -, or ()";
    }

    if (formData.emergencyContactPhone && !phoneRegex.test(formData.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = "Emergency contact phone must contain only numbers, spaces, +, -, or ()";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email) {
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        const domain = formData.email.split('@')[1];
        if (!validDomains.includes(domain.toLowerCase())) {
          newErrors.email = "Email must be from a recognized domain (Gmail, Yahoo, Outlook, etc.)";
        }
      }
    }

    // Experience validation (must be a positive number)
    if (formData.experience && (isNaN(formData.experience) || formData.experience < 0)) {
      newErrors.experience = "Experience must be a valid positive number";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
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
        
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Add Staff Member</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Role</option>
                <option value="veterinarian">Veterinarian</option>
                <option value="zookeeper">Zookeeper</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Department *</label>
              <input
                type="text"
                name="department"
                placeholder="Enter department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.department ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Phone *</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Hire Date *</label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.hireDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.hireDate && <p className="text-red-500 text-sm mt-1">{errors.hireDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Shift *</label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.shift ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Shift</option>
                <option value="morning shift">Morning Shift</option>
                <option value="afternoon shift">Afternoon Shift</option>
              </select>
              {errors.shift && <p className="text-red-500 text-sm mt-1">{errors.shift}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Specialization *</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.specialization ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Specialization</option>
                <option value="Large mammals">Large mammals</option>
                <option value="Carnivores">Carnivores</option>
                <option value="Avian care">Avian care</option>
                <option value="Zoo operations">Zoo operations</option>
              </select>
              {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Address *</label>
              <input
                type="text"
                name="address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Emergency Contact Name *</label>
              <input
                type="text"
                name="emergencyContactName"
                placeholder="Enter contact name"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.emergencyContactName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Emergency Contact Phone *</label>
              <input
                type="text"
                name="emergencyContactPhone"
                placeholder="Enter contact phone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.emergencyContactPhone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Experience (years) *</label>
              <input
                type="number"
                name="experience"
                placeholder="Years of experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.experience ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Certifications *</label>
              <input
                type="text"
                name="certifications"
                placeholder="Certifications (comma separated)"
                value={formData.certifications}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.certifications ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.certifications && <p className="text-red-500 text-sm mt-1">{errors.certifications}</p>}
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