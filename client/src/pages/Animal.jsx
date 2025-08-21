import SearchFilter from "../components/animals/SearchFilter";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import MetaCard from "../components/animals/MetaCard";
import { use, useState } from "react";
import { TotalAnimalsContext } from "../contexts/all.context";
import Card from "../components/animals/card";

const META_ANIMAL_DETAILS = [
  {
    count: 5,
    title: "Total Animals",
    icon: <FaHeart />,
    cardStyles: {
      backgroundColor: "#e6f9ed",
      color: "#166534",
    },
  },
  {
    count: 5,
    title: "Healthy",
    icon: <MdOutlineHealthAndSafety />,
    cardStyles: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
    },
  },
  {
    count: 1,
    title: "Need Attention",
    icon: <IoIosWarning />,
    cardStyles: {
      backgroundColor: "#fff3e6",
      color: "#b45309",
    },
  },
];

const Animal = () => {
  const { animalList, setAnimalList } = use(TotalAnimalsContext);
  const [filteredList, setFilteredList] = useState(animalList);
  return (
    <div className="px-4 w-full ">
      <div className="flex justify-between px-2 py-4">
        <div>
          <div className="text-3xl font-semibold">Animal Management</div>
          <div className="text-sm text-gray-700">
            Monitor and manage all animals in the zoo
          </div>
        </div>
        <div>
          <button className="bg-green-600 font-bold hover:bg-green-700 cursor-pointer rounded-md px-3 py-2 text-white text-sm">
            + Add New Animal
          </button>
        </div>
      </div>
      <div className="w-full">
        <SearchFilter />
      </div>
      <div className="flex my-6">
        {META_ANIMAL_DETAILS.map((details) => (
          <div className="w-1/3 mx-1">
            <MetaCard details={details} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap my-4">
        {filteredList.map((details) => (
          <div key={details.animalName} className="w-[32%] h-[200px] mx-2 my-2">
            <Card details={details} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animal;
