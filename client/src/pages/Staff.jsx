import MetaStaff from "../components/staff/MetaStaff";
import Addstaffmodal from "../components/staff/Addstaffmodal";
import SearchFilter from "../components/animals/SearchFilter";
import StaffCard from "../components/staff/StaffCard";
import { TotalStaff } from "../contexts/all.context";
import { use, useEffect, useState } from "react";
import { GET_STAFF } from "../apis/local.apis";
import { LuUsers } from "react-icons/lu";
import EmptyListCard from "../components/EmptyListCard";
function StaffList({ list }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 px-6">
      {list.map((staff, index) => (
        <StaffCard key={index} staff={staff} />
      ))}
    </div>
  );
}

function Header({ onAddStaff }) {
  return (
    <>
      <div className="flex flex-row justify-between items-center px-6 mt-6">
        <div>
          <h1 className="text-3xl font-semibold">Staff Management</h1>
          <div className="text-gray-700 text-sm">
            Manage zoo staff members and their assignments
          </div>
        </div>
        <button
          className="bg-green-500 font-semibold  hover:bg-green-600 cursor-pointer rounded-md px-3 py-2 text-white text-sm"
          onClick={onAddStaff}
        >
          + Add New Staff
        </button>
      </div>
    </>
  );
}

const Staff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddStaff, setIsAddStaff] = useState(false);
  const { staffList, setStaffList } = use(TotalStaff);
  const [filteredStaffList, setFilteredStaffList] = useState(staffList);
  useEffect(() => {
    const getStaffDetails = async () => {
      setIsLoading(true);
      let res = await fetch(GET_STAFF);
      res = await res.json();
      setStaffList(res.staff);
      setFilteredStaffList(res.staff);
      setIsLoading(false);
    };
    if (staffList.length == 0) getStaffDetails();
  }, []);
  const handleAddStaffClick = () => {
    setIsAddStaff(true);
  };
  return (
    <>
      <Header onAddStaff={handleAddStaffClick}></Header>
      <div className="px-3">
        <SearchFilter
          componentname={"staff by name or profession"}
          positionClasses="mt-4"
          needFilters={false}
          setFilteredList={setFilteredStaffList}
          originalList={staffList}
        />
      </div>
      {isAddStaff && (
        <Addstaffmodal
          onClose={() => setIsAddStaff(false)}
          setFilteredStaffList={setFilteredStaffList}
        />
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MetaStaff list={filteredStaffList}></MetaStaff>
          {filteredStaffList.length == 0 ? (
            <div className="w-full h-[200px] my-2 px-4">
              <EmptyListCard componentName={"Staff"} icon={<LuUsers />} />
            </div>
          ) : (
            <StaffList list={filteredStaffList} />
          )}
        </>
      )}
    </>
  );
};
export default Staff;
