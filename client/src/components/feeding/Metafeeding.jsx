import React from 'react';
import { FaList, FaCheck, FaClock, FaPercentage } from 'react-icons/fa';

const Metafeeding = ({ data }) => {
  // Calculate the metrics
  const totalFeedings = data.length;
  const completed = data.filter(item => item.feedingDone).length;
  const pending = data.filter(item => !item.feedingDone).length;
  const completionRate = totalFeedings > 0 ? Math.round((completed / totalFeedings) * 100) : 0;

  return (
    <>
      <div className="flex flex-row space-x-2 py-6 px-5">
        <div className="flex-1 rounded-[15px] bg-white py-4 shadow-sm shadow-gray-300 border border-gray-200 flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-6 ">
            <div className='bg-yellow-50 p-2 rounded-lg'>
              <FaList className="text-2xl text-yellow-400" />
            </div>
            <div className="ml-2">
              <p className="text-2xl font-bold">{totalFeedings}</p>
              <p className="text-md text-gray-500">Total Feedings</p>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-[15px] bg-white py-4 shadow-sm shadow-gray-300 border border-gray-200 flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-6">
            <div className='bg-green-100 p-2 rounded-lg'>
              <FaCheck className="text-2xl text-green-800  rounded-lg" />
            </div>
            <div className="ml-2">
              <p className="text-2xl font-bold">{completed}</p>
              <p className="text-md text-gray-500">Completed</p>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-[15px] bg-white py-4 shadow-sm shadow-gray-300 border border-gray-200 flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-6">
            <div className='bg-orange-100 p-2 rounded-lg'>
              <FaClock className="text-2xl text-orange-800 " />
            </div>
            <div className="ml-2">
              <p className="text-2xl font-bold">{pending}</p>
              <p className="text-md text-gray-500">Pending</p>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-[15px] bg-white py-4 shadow-sm shadow-gray-300 border border-gray-200 flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-6">
            <div className='bg-blue-100 p-2 rounded-lg  '>
              <FaPercentage className="text-2xl text-blue-800  " />
            </div>
            <div className="ml-2">
              <p className="text-2xl font-bold">{completionRate}%</p>
              <p className="text-md text-gray-500">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Metafeeding;
