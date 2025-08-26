import { FaRegHeart } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import InitialCard from "../components/dashboard/InitialCard";
import MetaCard from "../components/dashboard/MetaCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import { useEffect, useState } from "react";
import {
  GET_DASHBOARD_META_DETAILS,
  GET_FEEDING_STATS,
  GET_HEALTH_STATS,
  GET_RECENT_ACTIVITY,
} from "../apis/local.apis";
import axios from "axios";
import { createTimeString, getHourTime } from "../helpers/animal.helpers";
import { createPortal } from "react-dom";
import AddActivityModal from "../components/dashboard/AddActivityModal";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metaDashBoardDetails, setMetaDashBoardDetails] = useState([]);
  const [feedingsAndHealthCheck, setFeedingsAndHealthCheck] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  useEffect(() => {
    const getAllDashboardStats = async () => {
      setIsLoading(true);
      let res = await Promise.allSettled([
        axios.get(GET_DASHBOARD_META_DETAILS),
        axios.get(GET_FEEDING_STATS),
        axios.get(GET_HEALTH_STATS + "critical"),
        axios.get(GET_RECENT_ACTIVITY),
      ]);

      /* META DASHBOARD DETAILS */
      setMetaDashBoardDetails([
        {
          title: "Total Animals",
          icon: <FaRegHeart />,
          cardStyles: {
            backgroundColor: "#e6f9ed",
            color: "#166534",
          },
          metaData: {
            count: res[0].value.data.animal.animalCount,
            message: `${res[0].value.data.animal.healthy}` + " healthy",
            color: "text-green-400",
          },
        },
        {
          title: "Staff Members",
          icon: <FiUsers />,
          cardStyles: {
            backgroundColor: "#e6f0fa",
            color: "#1e3a8a",
          },
          metaData: {
            count: res[0].value.data.staff.staffCount,
            message: "on duty",
            color: "text-gray-400",
          },
        },
        {
          title: "Today's Feedings",
          icon: <FaRegCalendar />,
          cardStyles: {
            backgroundColor: "#fffbe6",
            color: "#92400e",
          },
          metaData: {
            count: `${res[0].value.data.feedings.completed}/${res[0].value.data.feedings.pending}`,
            message: `${res[0].value.data.feedings.pending}` + " pending",
            color: "text-green-400",
          },
        },
        {
          title: "Today's Visitors",
          icon: <MdOutlineRemoveRedEye />,
          cardStyles: {
            backgroundColor: "#fff3e6",
            color: "#9a3412",
          },
          metaData: {
            count: res[0].value.data.visitors.presentDayVisitor,
            message: "12% increase from yesterday", // TODO
            color: "text-green-400",
          },
        },
      ]);

      /* PENDING FEEDINGS AND HEALTH CHECKS */
      setFeedingsAndHealthCheck([
        {
          title: "Pending Feedings",
          icon: <FaRegCalendarAlt />,
          metaData: res[1].value.data.pendingFeedings.map((animal) => ({
            animalName: animal.animal_name,
            tag: getHourTime(animal.feeding_time),
            message: animal.diet,
            cardStyles: {
              backgroundColor: "#f3f4f6",
              tagColor: "#fb923c",
            },
          })),
        },
        {
          title: "Health Alerts",
          icon: <GoAlertFill />,
          metaData: res[2].value.data.details.map((animal) => ({
            animalName: animal.animal_name,
            message: animal.enclosure,
            tag: animal.health_status,
            cardStyles: {
              backgroundColor: "#FDF5E6",
              tagColor: "#F29D61",
            },
          })),
        },
      ]);

      /* RECENT ACTIVITY */
      setRecentActivity(
        res[3].value.data.result.map((animal) => ({
          message: animal.note,
          time: createTimeString(animal.created_at),
        }))
      );
      setIsLoading(false);
    };
    getAllDashboardStats();
  }, []);
  return (
    <div className="px-4 w-full">
      {isLoading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        <>
          <div className="w-full h-64 py-2 px-3 relative">
            <div className="absolute top-16 left-12 text-4xl font-extrabold text-white">
              <div>Welcome to Zoo Management System</div>
              <div className="mt-[10px]">
                <button
                  onClick={() => setIsActivityModalOpen(true)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 cursor-pointer text-sm font-semibold rounded-md"
                >
                  + Add an Activity
                </button>
              </div>
            </div>
            <img
              className="w-full h-full object-cover rounded-lg shadow-md"
              src="animal.jpg"
              alt="loading"
            />
          </div>
          {isActivityModalOpen &&
            createPortal(
              <AddActivityModal
                onClose={() => setIsActivityModalOpen(false)}
                setRecentActivity={setRecentActivity}
              />,
              document.body
            )}
          <div className="flex my-4">
            {metaDashBoardDetails.map((details, index) => (
              <div key={index} className="w-1/4 h-[150px] mx-2">
                <InitialCard details={details} />
              </div>
            ))}
          </div>
          <div className="flex my-4">
            {feedingsAndHealthCheck.map((details, index) => (
              <div key={index} className="w-1/2 h-[350px] mx-2">
                <MetaCard details={details} />
              </div>
            ))}
          </div>
          <div className="my-5">
            <div className="h-[400px] w-full px-1 py-1 my-1">
              <ActivityCard details={recentActivity} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
