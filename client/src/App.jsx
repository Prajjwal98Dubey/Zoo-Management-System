import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Animal from "./pages/Animal";
import Staff from "./pages/Staff";
import Feeding from "./pages/Feeding";
import { Toaster } from "react-hot-toast";
import { use, useEffect } from "react";
import { SelectedCategoryContext } from "./contexts/all.context";
import Error from "./pages/Error";
function App() {
  const { setCategory } = use(SelectedCategoryContext);
  useEffect(() => {
    if (location.pathname == "/") {
      setCategory("dashboard");
    } else {
      setCategory(location.pathname.split("/").at(-1));
    }
  }, []);
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/animal",
        element: <Animal />,
      },
      {
        path: "/staff",
        element: <Staff />,
      },
      {
        path: "/feeding",
        element: <Feeding />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
