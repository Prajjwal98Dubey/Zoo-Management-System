
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
    specialization: "Large mammals",
    address: "123 Zoo Lane, Cityville",
    emergencyContact: { name: "John Johnson", phone: "(555) 987-6543" },
    experience: 12,
    certifications: ["DVM", "Wildlife Medicine Certification"]
  },
  {
    name: "Mike Chen",
    role: "zookeeper",
    department: "Big Cats",
    phone: "(555) 234-5678",
    email: "mike.chen@zoo.com",
    hireDate: "3/15/2018",
    shift: "morning shift",
    specialization: "Carnivores",
    address: "456 Safari Rd, Cityville",
    emergencyContact: { name: "Lily Chen", phone: "(555) 876-5432" },
    experience: 8,
    certifications: ["Zookeeper Level 2", "Animal Behavior Training"]
  },
  {
    name: "Emma Rodriguez",
    role: "zookeeper",
    department: "Birds",
    phone: "(555) 345-6789",
    email: "emma.rodriguez@zoo.com",
    hireDate: "9/10/2020",
    shift: "afternoon shift",
    specialization: "Avian care",
    address: "789 Aviary Ave, Cityville",
    emergencyContact: { name: "Carlos Rodriguez", phone: "(555) 765-4321" },
    experience: 4,
    certifications: ["Bird Handling Certification", "Avian First Aid"]
  },
  {
    name: "James Wilson",
    role: "manager",
    department: "Operations",
    phone: "(555) 456-7890",
    email: "james.wilson@zoo.com",
    hireDate: "1/20/2012",
    shift: "morning shift",
    specialization: "Zoo operations",
    address: "321 Management Blvd, Cityville",
    emergencyContact: { name: "Nancy Wilson", phone: "(555) 654-3210" },
    experience: 18,
    certifications: ["Zoo Management Certification", "Leadership Training"]
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

