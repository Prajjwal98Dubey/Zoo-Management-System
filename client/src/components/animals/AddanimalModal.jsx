import { useState } from "react";
import { ADD_NEW_ANIMAL } from "../../apis/local.apis";
import toast from "react-hot-toast";

export default function AnimalModal({ onClose }) {
  const [formData, setFormData] = useState({
    animalName: "",
    species: "",
    category: "",
    age: "",
    weight: "",
    healthStatus: "",
    enclosure: "",
    lastCheckup: "",
    diet: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !localStorage.getItem("wild-auth") ||
      JSON.parse(localStorage.getItem("wild-auth")).userRole.toLowerCase() !==
        "admin"
    ) {
      toast.error("you don't have permission to add staff", {
        position: "top-center",
        duration: 1500,
      });
      return;
    }
    if (
      !formData.animalName.trim() ||
      !formData.species.trim() ||
      !formData.category.trim() ||
      !formData.age ||
      isNaN(formData.age) ||
      !formData.weight ||
      isNaN(formData.weight) ||
      !formData.healthStatus.trim() ||
      !formData.enclosure.trim() ||
      !formData.lastCheckup.trim() ||
      !formData.diet.trim() ||
      !formData.notes.trim()
    ) {
      toast.error("Enter all mandatory fields", {
        position: "top-center",
        duration: 1500,
      });
      return;
    }
    await fetch(ADD_NEW_ANIMAL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    toast.success("new animal added..", {
      position: "top-center",
      duration: 1500,
    });
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

        <h2 className="text-2xl font-bold mb-8 text-gray-900">Add Animal</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Animal Name
              </label>
              <input
                type="text"
                name="animalName"
                placeholder="Enter animal name"
                value={formData.animalName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Species
              </label>
              <input
                type="text"
                name="species"
                placeholder="Enter species"
                value={formData.species}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Category</option>
                <option value="Mammal">Mammal</option>
                <option value="Bird">Bird</option>
                <option value="Reptile">Reptile</option>
                <option value="Fish">Fish</option>
                <option value="Amphibian">Amphibian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                placeholder="Age in years"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                placeholder="Weight in kg"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Health Status
              </label>
              <select
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Health Status</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Enclosure
              </label>
              <input
                type="text"
                name="enclosure"
                placeholder="Enter enclosure location"
                value={formData.enclosure}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Last Checkup
              </label>
              <input
                type="date"
                name="lastCheckup"
                value={formData.lastCheckup}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Diet
              </label>
              <input
                type="text"
                name="diet"
                placeholder="Enter diet details"
                value={formData.diet}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                placeholder="Enter any additional notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
              />
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
              Save Animal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
