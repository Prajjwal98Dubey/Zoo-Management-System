import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SelectedCategoryContextProvider } from "./contexts/SelectedCategory.jsx";
import TotalAnimalsProvider from "./contexts/TotalAnimalsProvider.jsx";
import TotalStaffDataProvider from "./contexts/TotalStaff.jsx";

createRoot(document.getElementById("root")).render(
  <SelectedCategoryContextProvider>
    <TotalAnimalsProvider>
      <TotalStaffDataProvider>
      <App />
      </TotalStaffDataProvider>
    </TotalAnimalsProvider>
  </SelectedCategoryContextProvider>
);
