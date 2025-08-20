import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SelectedCategoryContextProvider } from "./contexts/SelectedCategory.jsx";

createRoot(document.getElementById("root")).render(
  <SelectedCategoryContextProvider>
    <App />
  </SelectedCategoryContextProvider>
);
