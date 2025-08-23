import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCheck, FaClock } from 'react-icons/fa';

const Feedinglist = ({ data }) => {
  const [feedingList, setFeedingList] = useState(data);

  const pendingFeedings = feedingList.filter(item => !item.feedingDone);
  const completedFeedings = feedingList.filter(item => item.feedingDone);

  function handleadd(animalName) {
    setFeedingList(prev =>
      prev.map(item =>
        item.animalName === animalName && !item.feedingDone
          ? { ...item, feedingDone: true }
          : item
      )
    );
  }


  return (
    <div className="px-6 flex flex-row justify-center items-center gap-x-8">
      {/* pending */}
  <div className='basis-1/2 w-1/2 h-[20rem] bg-white shadow-gray-300 rounded-lg py-7'>

        <div className='flex flex-row gap-3 items-center pl-3'>
          <FaClock className="text-2xl text-orange-800 " />
          <h2 className='font-bold text-2xl '>pending</h2>
        </div>
        <ul className="mt-4 pl-3 flex flex-col gap-3">
          {pendingFeedings.map((item, idx) => (
            <li
              key={idx}
              className="py-6  bg-orange-50  border border-orange-500 cursor-pointer hover:bg-orange-100 rounded flex items-center"
              onClick={() => handleadd(item.animalName)}
            >
              <FaCheckCircle className="text-gray-300 mr-2 transition-colors duration-200" />
              <span className="font-semibold">{item.animalName}</span> - {item.feedingTime} - {item.food}
            </li>
          ))}
        </ul>
      </div>

      {/* done */}
      <div className='basis-1/2 w-1/2 h-fit bg-white shadow-gray-300 rounded-lg py-7'>
        <div className='flex flex-row gap-3 items-center pl-3'>
          <FaCheck className="text-2xl text-green-800  rounded-lg" />
          <h2 className='font-bold text-2xl  '>completed feeding</h2>
        </div>
        <ul className="mt-4 pl-3 flex flex-col gap-3">
          {completedFeedings.map((item, idx) => (
            <li
              key={idx}
              className="py-6 bg-green-50 border border-green-500 hover:bg-green-100 rounded flex items-center"
            >
              <span className="font-semibold">{item.animalName}</span> - {item.feedingTime} - {item.food}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feedinglist;
