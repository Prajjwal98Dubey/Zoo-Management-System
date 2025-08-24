import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsTreeFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

import { use, useState } from "react";
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
  const [user, setUser] = useState({});
  const handleLogin = (role, name) => {
    localStorage.setItem(
      "wild-auth",
      JSON.stringify({ userRole: role, userName: name })
    );
    setUser({ ...user, userRole: role, userName: name });
  };
  const handleLogout = () => {
    localStorage.removeItem("wild-auth");
    setUser({});
  };

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
                : "hover:bg-amber-300"
            } px-2 my-2 rounded-md flex justify-center items-center py-2 w-full`}
          >
            <div className="px-4 font-extrabold flex justify-end w-1/3 text-lg">
              {field.icon}
            </div>
            <p className=" w-2/3 flex justify-start text-sm font-semibold">{field.name}</p>
          </div>
        </Link>
      ))}
      {localStorage.getItem("wild-auth") ? (
        <div className="absolute bottom-4 w-full">
          <div className="flex flex-row items-center gap-3 py-2">
            <div className="relative">
              <div
                onClick={handleLogout}
                className="absolute -right-1 top-[2px] bg-red-400 w-[23px] h-[23px] rounded-full flex  text-white font-semibold justify-center items-center cursor-pointer"
              >
                <MdLogout />
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${user.userName}&background=34d399&color=fff&size=64`}
                alt="User Avatar"
                className="rounded-full w-14 h-14 border-4 border-green-400 shadow"
              />
            </div>
            <div>
              <div className="font-semibold text-lg text-gray-800 flex justify-start px-2">
                Hi{" "}
                {JSON.parse(localStorage.getItem("wild-auth"))
                  .userName.charAt(0)
                  .toUpperCase() +
                  JSON.parse(
                    localStorage.getItem("wild-auth")
                  ).userName.substring(1)}
              </div>
              <div className="flex justify-start px-3 py-1 rounded-full border border-yellow-400 bg-yellow-100 text-yellow-700 font-semibold text-[10px] shadow-sm">
                {JSON.parse(localStorage.getItem("wild-auth")).userRole} mode
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-10 w-full text-white">
          <div className="w-full flex justify-center items-center py-2 my-1">
            <button
              onClick={() => handleLogin("guest", "alice")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-sm font-semibold px-6 py-2 rounded-[10px] shadow-md shadow-blue-400 hover:scale-105 transition duration-300"
            >
              Login as Guest
            </button>
          </div>
          <div className="w-full flex justify-center items-center py-2 my-1">
            <button
              onClick={() => handleLogin("admin", "bob")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-sm font-semibold px-6 py-2 rounded-[10px] shadow-md shadow-blue-400 hover:scale-105 transition duration-300"
            >
              Login as Manager
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
