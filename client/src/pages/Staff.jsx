import MetaStaff from "../components/staff/MetaStaff";
import SearchFilter from "../components/animals/SearchFilter";
import StaffCard from "../components/staff/StaffCard";
import { TotalStaff } from "../contexts/all.context";
import { use, useContext, useEffect, useState } from "react";
import { GET_STAFF } from "../apis/local.apis";
function StaffList() {
  const { staffList } = useContext(TotalStaff);
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 px-6">
      {staffList.map((staff, index) => (
        <StaffCard key={index} staff={staff} />
      ))}
    </div>
  );
}

function Header() {
  return (
    <>
      <h1>STAFF DASHBOARD</h1>
      <button>add staff + </button>
    </>
  );
}

const Staff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { staffList, setStaffList } = use(TotalStaff);
  useEffect(() => {
    const getStaffDetails = async () => {
      setIsLoading(true);
      let res = await fetch(GET_STAFF);
      res = await res.json();
      setStaffList(res.staff);
      setIsLoading(false);
    };
    if (staffList.length == 0) getStaffDetails();
  }, []);
  return (
    <>
      <SearchFilter
        componentname={"Staff"}
        positionClasses="mt-4"
        needFilters={false}
      ></SearchFilter>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MetaStaff></MetaStaff>
          <StaffList></StaffList>
        </>
      )}
    </>
  );
};
export default Staff;
