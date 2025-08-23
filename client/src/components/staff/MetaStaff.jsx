import { useContext } from "react";
import { TotalStaff } from "../../contexts/all.context";
import { FaUsers, FaUserTie, FaUserMd, FaClock } from "react-icons/fa";

function MetaStaff() {
  const { staffList } = useContext(TotalStaff);

  const totalVets = staffList.reduce(
    (count, staff) => (staff.staff_profession === "veterinarian" ? count + 1 : count),
    0
  );
  const zookeepers = staffList.reduce(
    (count, staff) => (staff.staff_profession === "zookeeper" ? count + 1 : count),
    0
  );
  const morningShift = staffList.reduce(
    (count, staff) => (staff.shiff_time === "morning shift" ? count + 1 : count),
    0
  );

  const cards = [
    {
      icon: <FaUsers className="text-blue-600" />,
      count: staffList.length,
      label: "Total Staff",
      bg: "bg-blue-100",
    },
    {
      icon: <FaUserTie className="text-green-600" />,
      count: zookeepers,
      label: "Zookeepers",
      bg: "bg-green-100",
    },
    {
      icon: <FaUserMd className="text-red-600" />,
      count: totalVets,
      label: "Veterinarians",
      bg: "bg-red-100",
    },
    {
      icon: <FaClock className="text-green-600" />,
      count: morningShift,
      label: "Morning Shift",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="flex flex-row gap-3 mt-4 px-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="w-full rounded-[15px] bg-white py-4 px-6 shadow-sm shadow-gray-300 border border-gray-200 flex items-center gap-3"
        >
          {/* icon */}
          <div className={`p-3 rounded-lg ${card.bg}`}>
            {card.icon}
          </div>
          {/* text */}
          <div>
            <h1 className="text-2xl font-bold">{card.count}</h1>
            <p className="text-sm text-gray-600">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetaStaff;
