import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SelectedCategoryContextProvider } from "./contexts/SelectedCategory.jsx";
import TotalAnimalsProvider from "./contexts/TotalAnimalsProvider.jsx";
import TotalStaffDataProvider from "./contexts/TotalStaff.jsx";
import SelectedAnimalFilterProvider from "./contexts/SelectedAnimalFilterProvider.jsx";
import { TotalFeedingProvider } from "./contexts/TotalFeeding.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <SelectedCategoryContextProvider>
      <SelectedAnimalFilterProvider>
        <TotalAnimalsProvider>
          <TotalStaffDataProvider>
            <TotalFeedingProvider>
              <App />
            </TotalFeedingProvider>
          </TotalStaffDataProvider>
        </TotalAnimalsProvider>
      </SelectedAnimalFilterProvider>
    </SelectedCategoryContextProvider>
  </UserContextProvider>
);
