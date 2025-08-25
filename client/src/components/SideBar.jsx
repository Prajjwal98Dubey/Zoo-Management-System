import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsTreeFill } from "react-icons/bs";

import { use } from "react";
import {
  SelectedCategoryContext,
  UserContext,
} from "../contexts/all.context.js";
import { MdLogout } from "react-icons/md";
import { LOGOUT_USER } from "../apis/local.apis.js";
import toast from "react-hot-toast";

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
  const { user, setUser } = use(UserContext);
  const handleLogout = async () => {
    let res = await fetch(LOGOUT_USER, {
      method: "GET",
      credentials: "include",
    });
    if (res.status == 200) {
      setUser({});
      toast.success("user logged out...", {
        position: "top-center",
        duration: 1500,
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 1500,
      });
    }
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
            <p className=" w-2/3 flex justify-start text-sm font-semibold">
              {field.name}
            </p>
          </div>
        </Link>
      ))}
      <div className="absolute bottom-4 w-full">
        {Object.keys(user).length > 0 ? (
          <div className="w-full flex justify-center items-center py-2 my-1">
            <div className="flex">
              <div className="w-[46px] relative  px-2 mx-2 h-[46px] bg-[#313131] rounded-full flex justify-center items-center text-white text-xl font-bold">
                <div
                  onClick={handleLogout}
                  className="absolute -right-1 top-0 bg-red-400 w-[20px] h-[20px] px-1 py-1 rounded-full flex  text-white font-light justify-center items-center cursor-pointer"
                >
                  <MdLogout />
                </div>
                {user.userName.charAt(0).toUpperCase() +
                  user.userName.charAt(user.userName.length - 1).toUpperCase()}
              </div>
              <div className="flex justify-center items-center">
                <div>
                  <div className="text-sm font-semibold">{user.userName}</div>
                  <div className="text-[11px] text-gray-700">
                    {user.userRole}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center py-2 my-1">
            <Link to="/auth">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-sm px-6 py-2 rounded-[10px] shadow-md shadow-blue-400 hover:scale-105 transition duration-300 text-white font-semibold">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
