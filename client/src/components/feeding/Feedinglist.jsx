import { FaCheckCircle, FaClock } from "react-icons/fa";
import { getHourTime } from "../../helpers/animal.helpers";
import { UPDATE_FEEDING_COMPLETE } from "../../apis/local.apis";

const Feedinglist = ({
  pendingFeedings,
  completedFeedings,
  setPendingFeedings,
  setCompleteFeedings,
}) => {
  const handleFeedingStatus = async (animalName, id) => {
    await fetch(UPDATE_FEEDING_COMPLETE + `/${id}/complete`, {
      method: "PATCH",
    });
    const feeding = pendingFeedings.find(
      (item) => item.animal_name === animalName
    );
    if (feeding) {
      setPendingFeedings((prev) =>
        prev.filter((item) => item.animal_name !== animalName)
      );
      setCompleteFeedings((prev) => [...prev, feeding]);
    }
  };

  return (
    <div className="flex gap-6 p-4">
      <div className="flex-1 bg-white shadow rounded-2xl p-4 h-96">
        <h2 className="flex items-center text-lg font-semibold text-orange-600 mb-3">
          <FaClock className="mr-2" />
          Pending Feedings ({pendingFeedings.length})
        </h2>
        <div className="h-[calc(100%-2.5rem)] overflow-y-auto space-y-3 pr-2 ">
          {pendingFeedings.map((item, idx) => (
            <div
              key={idx}
              className=" h-[7rem] rounded-lg p-3 bg-orange-50 hover:bg-orange-100  flex flex-row items-center gap-4"
            >
              <div
                className="w-4 h-4 rounded-full border border-orange-500 hover:cursor-pointer"
                onClick={() => handleFeedingStatus(item.animal_name, item.id)}
              ></div>
              <div className="flex justify-between flex-1">
                <div className="flex  flex-col justify-between font-bold text-gray-800">
                  {item.animal_name}
                  <div className="text-gray-400 text-sm">{item.diet}</div>
                  <div className="text-gray-400 text-[11px]">
                    {item.staff_name}
                  </div>
                </div>
                <div className="">
                  <span className="text-orange-600 border border-orange-400 rounded-full px-2 text-sm">
                    {getHourTime(item.feeding_time)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Feedings */}
      <div className=" flex-1 bg-white shadow rounded-2xl p-4 h-96">
        <h2 className=" flex items-center text-lg font-semibold text-green-600 mb-3">
          <FaCheckCircle className="mr-2" />
          Completed Feedings ({completedFeedings.length})
        </h2>
        <div className="h-[calc(100%-2.5rem)] overflow-y-auto space-y-3 pr-2">
          {completedFeedings.map((item, idx) => (
            <div
              key={idx}
              className="h-[7rem] rounded-lg p-3 bg-green-50 flex flex-row items-center gap-4"
            >
              <h2 className=" flex items-center text-lg font-semibold text-green-600 mb-3">
                <FaCheckCircle className="mr-2" />
              </h2>
              <div className="flex justify-between flex-1">
                <div className="flex flex-col justify-between font-bold text-gray-800">
                  {item.animal_name}
                  <div className="text-gray-400 text-sm">{item.diet}</div>
                  <div className="text-gray-400 text-[11px]">
                    {item.staff_name}
                  </div>
                </div>
                <div>
                  <span className="text-green-600 bg-green-100 rounded-full px-2 text-sm">
                    {getHourTime(item.feeding_time)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedinglist;
