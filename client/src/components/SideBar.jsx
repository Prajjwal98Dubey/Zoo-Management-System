import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsTreeFill } from "react-icons/bs";

import { use } from "react";
import { SelectedCategoryContext } from "../contexts/all.context.js";

const FIELDS = [
  {
    name: "Dashboard",
    route: "/",
    icon: <AiOutlineHome />,
  },
  {
    name: "Animal",
    route: "/animal",
    icon: <CiHeart />,
  },
  {
    name: "Staff",
    route: "/staff",
    icon: <FiUsers />,
  },
  {
    name: "Feeding",
    route: "/feeding",
    icon: <IoCalendarClearOutline />,
  },
];

const SideBar = () => {
  const { category, setCategory } = use(SelectedCategoryContext);
  return (
    <div className="w-full shadow-lg shadow-gray-400 min-h-screen px-2 relative">
      <div className="text-xl font-bold text-[#313131] font-mono flex justify-center items-center py-6">
        <div className="px-3 text-white bg-green-700 py-3 rounded-[30px]">
          <BsTreeFill />
        </div>
        <p className="px-2">WildCare Zoo</p>
      </div>
      {FIELDS.map((field) => (
        <Link key={field.name} to={field.route}>
          <div
            onClick={() => setCategory(field.name)}
            className={` ${
              category.toLowerCase() == field.name.toLowerCase()
                ? "bg-green-600 text-white"
                : "bg-white text-black"
            } cursor-pointer font-semibold ${
              category.toLowerCase() === field.name.toLowerCase()
                ? "hover:bg-green-500"
                : "hover:bg-amber-500"
            } px-2 my-2 rounded-md flex justify-center items-center py-2 w-full`}
          >
            <div className="px-4 font-extrabold flex justify-end w-1/3 text-lg">
              {field.icon}
            </div>
            <p className=" w-2/3 flex justify-start">{field.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
