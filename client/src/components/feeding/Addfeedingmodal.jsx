import { useState } from "react";

export default function AddFeedingModal({ onClose }) {
  const [formData, setFormData] = useState({
    animalName: "",
    feedingDone: "",
    feedingTime: "",
    food: "",
  });

  const [errors, setErrors] = useState({});

  const animalOptions = [
    'Lion', 'Elephant', 'Giraffe', 'Tiger', 'Monkey', 'Zebra', 
    'Bear', 'Hippo', 'Rhinoceros', 'Cheetah', 'Leopard', 'Crocodile'
  ];

  const feedingTimeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00'
  ];

  const animalFoodMap = {
    'Lion': ['Meat', 'Raw Meat', 'Beef', 'Chicken'],
    'Tiger': ['Meat', 'Raw Meat', 'Beef', 'Chicken'],
    'Cheetah': ['Meat', 'Raw Meat', 'Beef', 'Chicken'],
    'Leopard': ['Meat', 'Raw Meat', 'Beef', 'Chicken'],
    'Bear': ['Fish', 'Meat', 'Fruits', 'Berries', 'Nuts'],
    'Crocodile': ['Fish', 'Raw Meat', 'Chicken'],
    'Elephant': ['Fruits', 'Vegetables', 'Hay', 'Leaves', 'Grass'],
    'Hippo': ['Grass', 'Hay', 'Fruits', 'Vegetables'],
    'Rhinoceros': ['Grass', 'Hay', 'Leaves', 'Fruits'],
    'Giraffe': ['Leaves', 'Hay', 'Fruits', 'Vegetables'],
    'Zebra': ['Grass', 'Hay', 'Vegetables', 'Fruits'],
    'Monkey': ['Bananas', 'Fruits', 'Nuts', 'Seeds', 'Insects']
  };

  const getFoodOptions = (animal) => {
    return animalFoodMap[animal] || [];
  };

  const validateForm = () => {
    const newErrors = {};

    // Check all required fields
    Object.keys(formData).forEach(key => {
      if (!formData[key].toString().trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If animal is changed, reset food selection
    if (name === 'animalName') {
      setFormData((prev) => ({ ...prev, [name]: value, food: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts selecting
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
    
    // Convert feedingDone to boolean for consistency
    const submissionData = {
      ...formData,
      feedingDone: formData.feedingDone === 'true'
    };
    
    console.log("Feeding data submitted:", submissionData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white bg-opacity-95 backdrop-blur-md p-8 rounded-2xl max-w-xl w-full max-h-[85vh] shadow-2xl overflow-y-auto relative border border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 font-medium transition-colors"
        >
          Close
        </button>
        
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Add Feeding Schedule</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Animal Name *</label>
              <select
                name="animalName"
                value={formData.animalName}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.animalName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Animal</option>
                {animalOptions.map(animal => (
                  <option key={animal} value={animal}>{animal}</option>
                ))}
              </select>
              {errors.animalName && <p className="text-red-500 text-sm mt-1">{errors.animalName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Feeding Status *</label>
              <select
                name="feedingDone"
                value={formData.feedingDone}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.feedingDone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Status</option>
                <option value="true">Feeding Done</option>
                <option value="false">Feeding Pending</option>
              </select>
              {errors.feedingDone && <p className="text-red-500 text-sm mt-1">{errors.feedingDone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Feeding Time *</label>
              <select
                name="feedingTime"
                value={formData.feedingTime}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.feedingTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select Time</option>
                {feedingTimeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.feedingTime && <p className="text-red-500 text-sm mt-1">{errors.feedingTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Food Type *</label>
              <select
                name="food"
                value={formData.food}
                onChange={handleChange}
                disabled={!formData.animalName}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  !formData.animalName ? 'opacity-50 cursor-not-allowed' : ''
                } ${
                  errors.food ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">{formData.animalName ? 'Select Food' : 'Select Animal First'}</option>
                {getFoodOptions(formData.animalName).map(food => (
                  <option key={food} value={food}>{food}</option>
                ))}
              </select>
              {errors.food && <p className="text-red-500 text-sm mt-1">{errors.food}</p>}
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
              Save Feeding Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}