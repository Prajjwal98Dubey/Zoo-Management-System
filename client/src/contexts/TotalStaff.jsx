
import { TotalStaff } from "./all.context";
import { useState } from "react";


const StaffData = [
  {
    name: "Dr. Sarah Johnson",
    role: "veterinarian",
    department: "Animal Health",
    phone: "(555) 123-4567",
    email: "sarah.johnson@zoo.com",
    hireDate: "6/1/2015",
    shift: "morning shift",
    specialization: "Large mammals"
  },
  {
    name: "Mike Chen",
    role: "zookeeper",
    department: "Big Cats",
    phone: "(555) 234-5678",
    email: "mike.chen@zoo.com",
    hireDate: "3/15/2018",
    shift: "morning shift",
    specialization: "Carnivores"
  },
  {
    name: "Emma Rodriguez",
    role: "zookeeper",
    department: "Birds",
    phone: "(555) 345-6789",
    email: "emma.rodriguez@zoo.com",
    hireDate: "9/10/2020",
    shift: "afternoon shift",
    specialization: "Avian care"
  },
  {
    name: "James Wilson",
    role: "manager",
    department: "Operations",
    phone: "(555) 456-7890",
    email: "james.wilson@zoo.com",
    hireDate: "1/20/2012",
    shift: "morning shift",
    specialization: "Zoo operations"
  }
];

export default function TotalStaffDataProvider({children}){
const [staffList, setStaffList] = useState([])

return (

<TotalStaff.Provider value ={{staffList, setStaffList}}>
    {children}
</TotalStaff.Provider>
)

}

