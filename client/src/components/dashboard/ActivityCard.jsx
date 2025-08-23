import { IoMdTrendingUp } from "react-icons/io";

const ActivityCard = ({ details }) => {
  return (
    <div className="py-3 rounded-[15px] shadow-sm shadow-gray-300 border border-gray-200 bg-white h-full px-2">
      <div className="flex justify-start">
        <div className="text-blue-500 font-bold text-xl px-3 py-2 flex justify-center items-center">
          <IoMdTrendingUp />
        </div>
        <div className="text-xl font-semibold flex justify-center items-center">
          Recent Activity
        </div>
      </div>
      <div className="px-2 h-[300px] overflow-auto">
        {details.map((m, index) => (
          <div
            key={index}
            className={`w-full h-fit my-2 px-2 py-2  rounded-[15px] ${
              index % 2 === 0 ? "bg-[#EAF9EA]" : "bg-[#EBF2FE]"
            }`}
          >
            <div className="px-2 py-1 text-[14px]">{m.message}</div>
            <div className="text-[12px] text-gray-700 px-2">{m.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
