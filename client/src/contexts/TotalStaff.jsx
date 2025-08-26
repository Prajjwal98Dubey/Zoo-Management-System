import { TotalStaff } from "./all.context";
import { useState } from "react";

export default function TotalStaffDataProvider({ children }) {
  const [staffList, setStaffList] = useState([]);

  return (
    <TotalStaff.Provider value={{ staffList, setStaffList }}>
      {children}
    </TotalStaff.Provider>
  );
}
