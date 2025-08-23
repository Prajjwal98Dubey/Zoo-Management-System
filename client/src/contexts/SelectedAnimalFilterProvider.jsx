import { useState } from "react";
import { SelectedAnimalFilter } from "./all.context.js";

function SelectedAnimalFilterProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    healthStatus: "all",
  });

  return (
    <SelectedAnimalFilter.Provider value={{ filters, setFilters }}>
      {children}
    </SelectedAnimalFilter.Provider>
  );
}

export default SelectedAnimalFilterProvider;
