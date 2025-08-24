import React, { useEffect, useState } from "react";
import Metafeeding from "../components/feeding/Metafeeding";
import Feedinglist from "../components/feeding/Feedinglist";
import Schedule from "../components/feeding/Schedule";
import AddFeedingModal from "../components/feeding/Addfeedingmodal";
import { COMPLETE_FEEDINGS, PENDING_FEEDINGS } from "../apis/local.apis";
import axios from "axios";
const Feeding = () => {
  // const [isAddFeeding, setIsAddFeeding] = React.useState(false);
  const [pendingFeedings, setPendingFeedings] = useState([]);
  const [completeFeedings, setCompleteFeedings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getFeedingDetails = async () => {
      setIsLoading(true);
      let result = await Promise.allSettled([
        axios.get(PENDING_FEEDINGS),
        axios.get(COMPLETE_FEEDINGS),
      ]);
      /* PENDINGS */
      setPendingFeedings(
        result[0].value.data.pendingFeedings.map((feed) => ({
          ...feed,
          feedingDone: false,
        }))
      );

      /* COMPLETED */
      setCompleteFeedings(
        result[1].value.data.completedFeedings.map((feed) => ({
          ...feed,
          feedingDone: true,
        }))
      );
      setIsLoading(false);
    };
    getFeedingDetails();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between px-5 py-3">
        <div>
          <h1 className="text-3xl font-bold">Feeding Schedule</h1>
          <div className="text-gray-700 text-sm">
            Manage daily feeding routines for all animals
          </div>
        </div>
        {/* {isAddFeeding &&
          createPortal(
            <AddFeedingModal
              onClose={() => {
                setIsAddFeeding(false);
              }}
            />,
            document.body
          )} */}
      </div>
      {!isLoading && (
        <>
          <Metafeeding
            pendingFeedings={pendingFeedings}
            completedFeedings={completeFeedings}
          />

          <Feedinglist
            pendingFeedings={pendingFeedings}
            completedFeedings={completeFeedings}
            setPendingFeedings={setPendingFeedings}
            setCompleteFeedings={setCompleteFeedings}
          />
          <Schedule
            pendingFeedings={pendingFeedings}
            completedFeedings={completeFeedings}
          />
        </>
      )}
    </div>
  );
};

export default Feeding;
