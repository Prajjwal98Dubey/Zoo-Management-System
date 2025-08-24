import React, { useContext } from 'react';
import Metafeeding from '../components/feeding/Metafeeding';
import Feedinglist from '../components/feeding/Feedinglist';
import Schedule from '../components/feeding/Schedule';
import { TotalFeeding } from '../contexts/all.context';
import { createPortal } from 'react-dom';
import AddFeedingModal from '../components/feeding/Addfeedingmodal';
const Feeding = () => {
  const { feedingData } = useContext(TotalFeeding);
  const [isAddFeeding, setIsAddFeeding] = React.useState(false);

  return (
    <div className="">
      
     <div className='flex justify-between px-5 py-3'>
     <h1 className="text-3xl font-bold">Feeding Schedule</h1>
     <button className="bg-green-600 font-bold hover:bg-green-700 cursor-pointer rounded-md px-3 py-2 text-white text-sm" onClick={()=>{setIsAddFeeding(true)}}>
            + Add Feeding
          </button>
          {isAddFeeding && createPortal(<AddFeedingModal onClose={()=>{setIsAddFeeding(false)}} />, document.body)}
     </div>
      <Metafeeding data={feedingData} />
       <Schedule data={feedingData} />
      <Feedinglist data={feedingData} />
     
    </div>
  );
};

export default Feeding;
