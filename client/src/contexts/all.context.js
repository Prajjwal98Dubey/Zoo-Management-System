import { createContext } from "react";
import {StaffData} from '../components/staff/StaffData'
export const SelectedCategoryContext = createContext();
export const TotalAnimalsContext = createContext();
export const TotalStaff = createContext(StaffData.length);
