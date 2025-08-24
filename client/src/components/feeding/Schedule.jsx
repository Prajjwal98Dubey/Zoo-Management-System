import { getHourTime } from "../../helpers/animal.helpers";
import { MdAccessTime } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const Schedule = ({ completedFeedings, pendingFeedings }) => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="font-bold text-xl">Today's schedule</h2>
      <div className=" flex justify-around overflow-x-auto mt-4 ">
        {pendingFeedings.map((schedule, index) => (
          <div key={index} className="w-full bg-[#FEFAF3] mx-1 h-[100px]">
            <div className="flex px-1 justify-start w-full py-2">
              <div className="text-lg py-1 text-[#F6AA28] flex justify-start px-2 items-center">
                <MdAccessTime />
              </div>
              <div className="text-gray-600 font-semibold text-sm flex justify-center items-center">
                {getHourTime(schedule.feeding_time)}
              </div>
            </div>
            <div className="w-full px-4 text-[15px]">
              {schedule.animal_name}
            </div>
            <div className="w-full px-4 text-gray-700 text-[11px]">
              {schedule.diet}
            </div>
          </div>
        ))}
        {completedFeedings.map((schedule, index) => (
          <div key={index} className="w-full bg-[#F5FCF5] mx-1 h-[100px]">
            <div className="flex px-1 justify-start w-full py-2">
              <div className="text-lg py-1 text-[#7CDE7C] flex justify-start px-2 items-center">
                <FaCheckCircle />
              </div>
              <div className="text-gray-600 font-semibold text-sm flex justify-center items-center">
                {getHourTime(schedule.feeding_time)}
              </div>
            </div>
            <div className="w-full px-4 text-[15px]">
              {schedule.animal_name}
            </div>
            <div className="w-full px-4 text-gray-700 text-[11px]">
              {schedule.diet}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
