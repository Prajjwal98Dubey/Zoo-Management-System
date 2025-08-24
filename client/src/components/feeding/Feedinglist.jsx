import React, { useState } from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

const Feedinglist = ({ pendingFeedings, completedFeedings, onDone }) => {


  // const pendingFeedings = feedingList.filter(item => !item.feedingDone);
  // const completedFeedings = feedingList.filter(item => item.feedingDone);

  // function handleadd(animalName) {
  //   setFeedingList(prev =>
  //     prev.map(item =>
  //       item.animalName === animalName && !item.feedingDone
  //         ? { ...item, feedingDone: true }
  //         : item
  //     )
  //   );
  // }

  return (
    <div className="flex gap-6 p-4">
      {/* Pending Feedings */}
      <div className="flex-1 bg-white shadow rounded-2xl p-4 h-96">
        <h2 className="flex items-center text-lg font-semibold text-orange-600 mb-3">
          <FaClock className="mr-2" />
          Pending Feedings ({pendingFeedings.length})
        </h2>
        <div className="h-[calc(100%-2.5rem)] overflow-y-auto space-y-3 pr-2">
          {pendingFeedings.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onDone(item.animalName)}
              className="cursor-pointer border rounded-lg p-3 bg-orange-50 hover:bg-orange-100 transition"
            >
              <div className="flex justify-between font-semibold text-gray-800">
                {item.animalName}
                <span className="text-orange-600 border border-orange-400 rounded-full px-2 text-sm">
                  {item.feedingTime}
                </span>
              </div>
              <div className="text-gray-600 text-sm">{item.food}</div>
              <div className="text-gray-500 text-xs">By {item.caretaker}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Feedings */}
      <div className="flex-1 bg-white shadow rounded-2xl p-4 h-96">
        <h2 className="flex items-center text-lg font-semibold text-green-600 mb-3">
          <FaCheckCircle className="mr-2" />
          Completed Feedings ({completedFeedings.length})
        </h2>
        <div className="h-[calc(100%-2.5rem)] overflow-y-auto space-y-3 pr-2">
          {completedFeedings.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-3 bg-green-50"
            >
              <div className="flex justify-between font-semibold text-gray-800">
                {item.animalName}
                <span className="text-green-600 bg-green-100 rounded-full px-2 text-sm">
                  {item.feedingTime}
                </span>
              </div>
              <div className="text-gray-600 text-sm">{item.food}</div>
              <div className="text-gray-500 text-xs">By {item.caretaker}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedinglist;
