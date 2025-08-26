import { use, useState } from "react";
import {
  TotalAnimalsContext,
  TotalStaff,
  UserContext,
} from "../../contexts/all.context";
import toast from "react-hot-toast";
import { ADD_FEEDINGS } from "../../apis/local.apis";

export default function AddFeedingModal({ onClose, setPendingFeedings }) {
  const { animalList } = use(TotalAnimalsContext);
  const { staffList } = use(TotalStaff);
  const { user } = use(UserContext);
  const [formData, setFormData] = useState({
    animalName: "",
    feedingTime: "",
    food: "",
    amount: "",
    staffName: "",
  });
  const [foodTypeList, setFoodTypeList] = useState([]);
  const [errors, setErrors] = useState({});

  const animalFoodMap = {
    Lion: ["Meat", "Raw Meat", "Beef", "Chicken"],
    Tiger: ["Meat", "Raw Meat", "Beef", "Chicken"],
    Cheetah: ["Meat", "Raw Meat", "Beef", "Chicken"],
    Leopard: ["Meat", "Raw Meat", "Beef", "Chicken"],
    Bear: ["Fish", "Meat", "Fruits", "Berries", "Nuts"],
    Crocodile: ["Fish", "Raw Meat", "Chicken"],
    Elephant: ["Fruits", "Vegetables", "Hay", "Leaves", "Grass"],
    Hippo: ["Grass", "Hay", "Fruits", "Vegetables"],
    Rhinoceros: ["Grass", "Hay", "Leaves", "Fruits"],
    Giraffe: ["Leaves", "Hay", "Fruits", "Vegetables"],
    Zebra: ["Grass", "Hay", "Vegetables", "Fruits"],
    Monkey: ["Bananas", "Fruits", "Nuts", "Seeds", "Insects"],
  };

  const mapAnimalToFoodType = (animalName) => {
    let animalSpecies = "";
    animalSpecies = animalList.filter(
      (animal) => animal.animal_name.toLowerCase() == animalName.toLowerCase()
    )?.[0]?.species;
    let animalToFood = [];
    Object.keys(animalFoodMap)
      .filter(
        (key) =>
          key.toLowerCase() == animalSpecies.toLowerCase() ||
          animalSpecies.toLowerCase().includes(key.toLowerCase())
      )
      .forEach((animal) => animalToFood.push(...animalFoodMap[animal]));
    return animalToFood;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "animalName") {
      setFormData((prev) => ({ ...prev, [name]: value, food: "" }));
      setFoodTypeList(mapAnimalToFoodType(e.target.value));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(user).length == 0 || user.userRole != "manager")
      return toast.error("you are not allowed to add feedings", {
        position: "top-center",
        duration: 1500,
      });
    if (
      !formData.animalName ||
      !formData.feedingTime ||
      !formData.food ||
      !formData.amount ||
      !formData.staffName
    )
      return toast.error("enter all mandatory fields");
    if (Date.now() > new Date(formData.feedingTime).getTime())
      return toast.error("select a valid date and time", {
        position: "top-center",
        duration: 1500,
      });
    let staff_id = staffList.filter(
      (staff) =>
        staff.staff_name.toLowerCase() == formData.staffName.toLowerCase()
    )[0].staff_id;
    let animal_id = animalList.filter(
      (animal) =>
        animal.animal_name.toLowerCase() == formData.animalName.toLowerCase()
    )[0].animal_id;
    let res = await fetch(ADD_FEEDINGS, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        animal_id,
        animal_name: formData.animalName,
        feeding_time: formData.feedingTime,
        food_type: formData.food,
        amount: formData.amount,
        staff_id,
        staff_name: formData.staffName,
        notes: "",
      }),
    });
    if (
      res.status == 204 ||
      res.status == 400 ||
      res.status == 500 ||
      res.status == 403
    )
      return toast.error("not allowed", {
        position: "top-center",
        duration: 1500,
      });
    res = await res.json();
    setPendingFeedings((prev) => [...prev, { ...res }]);
    toast.success("feeding added...", {
      position: "top-center",
      duration: 1500,
    });
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

        <h2 className="text-2xl font-bold mb-8 text-gray-900">
          Add Feeding Schedule
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Animal Name *
              </label>
              <select
                name="animalName"
                value={formData.animalName}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  errors.animalName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select Animal</option>
                {animalList.map((animal) => (
                  <option key={animal.animal_id} value={animal.animal_name}>
                    {animal.animal_name}
                  </option>
                ))}
              </select>
              {errors.animalName && (
                <p className="text-red-500 text-sm mt-1">{errors.animalName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Feeding Time *
              </label>
              <input
                type="datetime-local"
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
                name="feedingTime"
                value={formData.feedingTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Food Type *
              </label>
              <select
                name="food"
                value={formData.food}
                onChange={handleChange}
                disabled={!formData.animalName}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all ${
                  !formData.animalName ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  errors.food
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">
                  {formData.animalName ? "Select Food" : "Select Animal First"}
                </option>
                {foodTypeList.map((food) => (
                  <option key={food} value={food}>
                    {food}
                  </option>
                ))}
              </select>
              {errors.food && (
                <p className="text-red-500 text-sm mt-1">{errors.food}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Amount (in kg) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Staff Name *
              </label>
              <select
                name="staffName"
                // value={formData.staffName}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:border-transparent transition-all 
                } ${
                  errors.food
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select Staff</option>
                {staffList
                  .filter(
                    (staff) =>
                      staff.staff_profession.toLowerCase() == "zookeeper"
                  )
                  .map((s) => (
                    <option key={s.staff_id} value={s.staff_name}>
                      {s.staff_name}
                    </option>
                  ))}
              </select>
              {errors.food && (
                <p className="text-red-500 text-sm mt-1">{errors.food}</p>
              )}
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
