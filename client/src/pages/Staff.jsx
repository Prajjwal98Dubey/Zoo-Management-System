import MetaStaff from "../components/staff/MetaStaff";
import SearchFilter from "../components/animals/SearchFilter";
import StaffCard from "../components/staff/StaffCard";
import { TotalStaff } from "../contexts/all.context";
import { useContext } from "react";





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

function Header(){
  return (
    <>
    <h1>STAFF DASHBOARD</h1>
    <button>add staff + </button>
    
    
    </>
  )
}



const Staff = () => {
  
  return (
    <>
      <Header></Header>
      <SearchFilter componentname={"Staff"} positionClasses='mt-4'></SearchFilter>
      <MetaStaff ></MetaStaff>
      <StaffList></StaffList>


      </>
      );
};

  export default Staff;
