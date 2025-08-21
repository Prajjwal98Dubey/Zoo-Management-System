import { CiCalendar } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const healthColors = {
  excellent: "from-green-600 to-green-700 ",
  good: "from-blue-400 to-blue-500",
  fair: "from-amber-400 to-amber-500",
  poor: "from-orange-400 to-orange-500",
  critical: "from-red-400 to-red-500",
};

const categoryEmojis = {
  mammal: "🦁",
  bird: "🦅",
  reptile: "🐢",
  amphibian: "🐸",
  fish: "🐠",
};

const Card = ({ details }) => {
  return (
    <div className="shadow-sm w-full h-full px-3 py-2 shadow-gray-300 border border-gray-200 text-sm bg-white rounded-[15px]">
      <div className="flex justify-between pt-3">
        <div className="flex px-2">
          <div className="rounded-fullflex justify-center items-center text-2xl">
            {categoryEmojis[details.category.toLowerCase()]
              ? categoryEmojis[details.category.toLowerCase()]
              : "🫏"}
          </div>
          <div className="flex justify-center items-center px-1 text-lg">
            {details.animalName}
          </div>
        </div>
        <div
          className={`w-[60px] h-[25px] flex justify-center items-center bg-gradient-to-r ${
            healthColors[details.healthStatus.toLowerCase()]
          } rounded-[20px] text-white text-[10px] font-semibold`}
        >
          {details.healthStatus}
        </div>
      </div>
      <div className="py-1 px-2 text-sm text-gray-500">{details.species}</div>
      <div className="py-1 text-sm text-gray-500 flex justify-between font-medium">
        <div className="flex">
          <div className="px-1 flex justify-center items-center">
            <CiCalendar />
          </div>
          <div className="flex justify-normal items-center">
            {details.age} years old
          </div>
        </div>
        <div className="flex">
          <div className="px-1 flex justify-center items-center">
            <CiLocationOn />
          </div>
          <div className="flex justify-normal items-center">
            {details.enclosure}
          </div>
        </div>
      </div>
      <div className="py-1 text-sm text-gray-500 flex justify-start font-medium">
        <div className="flex">
          <div className="px-1 flex justify-center items-center">
            <CiHeart />
          </div>
          <div className="flex justify-normal items-center">
            last checkup: {details.lastCheckup}
          </div>
        </div>
      </div>
      <div className="flex justify-center py-3">
        <div className="w-1/2 px-4">
          <button
            // onClick={() => setShowModal(true)}
            className="w-full flex bg-[hsl(40,20%,97%)] px-4 py-2 justify-center items-center rounded-[10px] hover:bg-amber-400"
          >
            <div className="flex justify-center items-center text-lg px-1">
              <MdOutlineRemoveRedEye />
            </div>
            <div className="flex justify-center items-center font-semibold text-sm">
              View
            </div>
          </button>
        </div>
        <div className="w-1/2 px-4">
          <button className="w-full flex bg-green-500 hover:bg-green-600 text-white px-4 py-2 justify-center items-center rounded-[10px]">
            <div className="flex justify-center items-center text-lg px-1">
              <FaRegEdit />
            </div>
            <div className="flex justify-center items-center font-semibold text-sm">
              Edit
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
