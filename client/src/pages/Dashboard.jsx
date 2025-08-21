import { FaRegHeart } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaRegCalendar } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { IoMdTrendingUp } from "react-icons/io";

import InitialCard from "../components/dashboard/InitialCard";
import MetaCard from "../components/dashboard/MetaCard";
import ActivityCard from "../components/dashboard/ActivityCard";

const DASHBOARD_DETAILS = [
  {
    title: "Total Animals",
    icon: <FaRegHeart />,
    cardStyles: {
      backgroundColor: "#e6f9ed",
      color: "#166534",
    },
    metaData: {
      count: 5,
      message: "4 healthy",
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
      count: 5,
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
      count: "2/4",
      message: "2 pending",
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
      count: 342,
      message: "12% increase from yesterday",
      color: "text-green-400",
    },
  },
];

const META_DASHBOARD_DETAILS = [
  {
    title: "Pending Feedings",
    icon: <FaRegCalendarAlt />,
    metaData: [
      {
        animalName: "Ruby",
        tag: "10:00",
        message: "Seeds & fruits",
        cardStyles: {
          backgroundColor: "#f3f4f6",
          tagColor: "#fb923c",
        },
      },
      {
        animalName: "Max",
        tag: "11:00",
        message: "Raw Meat",
        cardStyles: {
          backgroundColor: "#f3f4f6",
          tagColor: "#fb923c",
        },
      },
    ],
  },
  {
    title: "Health Alerts",
    icon: <GoAlertFill />,
    metaData: [
      {
        animalName: "Charlie",
        message: "Green Sea Turtle - Marine Habitat",
        tag: "fair",
        cardStyles: {
          backgroundColor: "#FDF5E6",
          tagColor: "#F29D61",
        },
      },
    ],
  },
];

const RECENT_ACTITVITY_DETAILS = [
  {
    title: "Recent Activity",
    icon: <IoMdTrendingUp />,
    messages: [
      {
        message: "Leo the African Lion completed morning feeding",
        time: "2 hours ago", // will change once backend will send a exact time string
      },
      {
        message: "Dr. Sarah Johnson completed health checkup for Bella",
        time: "4 hours ago",
      },
      {
        message: "New animal Max arrived at Big Cat Habitat 2",
        time: "1 day ago",
      },
    ],
  },
];

const Dashboard = () => {
  return (
    <div className="px-4 w-full">
      <div className="flex my-4">
        {DASHBOARD_DETAILS.map((details) => (
          <div className="w-1/4 h-[150px] mx-2">
            <InitialCard details={details} />
          </div>
        ))}
      </div>
      <div className="flex my-4">
        {META_DASHBOARD_DETAILS.map((details) => (
          <div className="w-1/2 h-[250px] mx-2">
            <MetaCard details={details} />
          </div>
        ))}
      </div>
      <div className="my-5">
        {RECENT_ACTITVITY_DETAILS.map((details) => (
          <div className="h-[300px] w-full px-1 py-1 my-1">
            <ActivityCard details={details} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
