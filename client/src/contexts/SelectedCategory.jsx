import { useState } from "react";
import { SelectedCategoryContext } from "./all.context.js";

export const SelectedCategoryContextProvider = ({ children }) => {
  const [category, setCategory] = useState("dashboard");
  return (
    <SelectedCategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </SelectedCategoryContext.Provider>
  );
};
