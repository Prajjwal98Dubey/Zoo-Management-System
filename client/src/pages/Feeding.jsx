import React, { useContext } from 'react';
import Metafeeding from '../components/feeding/Metafeeding';
import Feedinglist from '../components/feeding/Feedinglist';
import Schedule from '../components/feeding/Schedule';
import { TotalFeeding } from '../contexts/all.context';

const Feeding = () => {
  const { feedingData } = useContext(TotalFeeding);

  return (
    <div className="">
      
     <div className='flex justify-between px-5 py-3'>
     <h1 className="text-3xl font-bold">Feeding Schedule</h1>
     <button className="bg-green-600 font-bold hover:bg-green-700 cursor-pointer rounded-md px-3 py-2 text-white text-sm">
            + Add Feeding
          </button>
     </div>
      <Metafeeding data={feedingData} />
      <Feedinglist data={feedingData} />
      <Schedule data={feedingData} />
    </div>
  );
};

export default Feeding;
